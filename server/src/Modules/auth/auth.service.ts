import {
	ConflictException,
	HttpException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PasswordChangedEvent, SendForgotPasswordMailEvent, SendVerifyMailEvent } from 'src/Events/notification.events';
import { UserCreatedEvent } from 'src/Events/user.events';
import { SelectUserWithoutPassword } from 'src/Utils/Types/model.types';
import { TOKEN_EXPIRED_ERROR_CODE } from 'src/Utils/constants';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailDTO } from './dto/email.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly encryptionService: EncryptionService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	/**
	 * @description - Validates a user's email and password
	 * @param {string} email - The user's email
	 * @param {string} password - The user's password
	 * @throws {NotFoundException} - Throws an error if the user is not found
	 * @throws {UnauthorizedException} - Throws an error if the email is not verified or the password is invalid
	 * @returns {Promise<SelectUserWithoutPassword | null>} - Returns the user without the password
	 */
	async validateUser(email: string, password: string): Promise<SelectUserWithoutPassword | null> {
		const user = await this.usersService.getUserByEmail(email);

		if (user instanceof Error) throw user;
		if (!user.settings.is_verified) throw new UnauthorizedException('Email not verified');

		const isPasswordValid = await this.encryptionService.comparePassword(password, user.password);
		if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

		if (user && isPasswordValid) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	/**
	 * @description - Creates a new user and sends a confirmation email
	 * @param {CreateUserDTO} createUserDTO - The user's data
	 * @throws {HttpException} - Throws an error if the user already exists
	 * @throws {HttpException} - Throws an error if the token generation fails
	 * @returns {Promise<string>} - Returns the user's id or an error
	 */
	async createUser(createUserDTO: CreateUserDTO): Promise<string> {
		const hashedPassword = await this.encryptionService.hashPassword(createUserDTO.password);

		const createdUser = await this.usersService.createNewUser({ ...createUserDTO, password: hashedPassword });
		const userID = createdUser.id;

		const token = await this.encryptionService.generateToken(userID);

		this.eventEmitter.emit('user.created', new UserCreatedEvent(userID));
		this.eventEmitter.emit(
			'mail.verify-email',
			new SendVerifyMailEvent(userID, createUserDTO.email, createUserDTO.first_name, token),
		);
		return userID;
	}

	/**
	 * @description - Verifies a user's email
	 * @param {string} userID - The user's id
	 * @param {string} token - The token to verify the user's email
	 * @throws {NotFoundException} - Throws an error if the user is not found
	 * @throws {HttpException} - Throws an error if the email is already verified
	 * @throws {HttpException} - Throws an error if the token is invalid or expired
	 * @throws {UnauthorizedException} - Throws an error if the token does not match the user
	 * @returns {Promise<string | >} - Returns the user's id or an error
	 */
	async verifyEmail(userID: string, token: string): Promise<string | Error> {
		const user = await this.usersService.getUserByID(userID);
		if (user.settings.is_verified) return new ConflictException('Email already verified');

		const existingToken = await this.encryptionService.getTokensByUserId(userID);
		if (!existingToken.includes(token))
			return new HttpException(
				'Der Token für die E-Mail-Verifizierung ist ungültig oder abgelaufen',
				TOKEN_EXPIRED_ERROR_CODE,
			);

		const isTokenValid = await this.encryptionService.verifyToken(token);
		if (isTokenValid instanceof Error) return isTokenValid;

		await this.encryptionService.deleteToken(token);
		await this.usersService.setVerificationStatus(userID, true);

		return userID;
	}

	/**
	 * @description - Resends a verification email
	 * @param {string} email - The user's email
	 * @throws {HttpException} - Throws an error if the email is not found
	 * @throws {HttpException} - Throws an error if the email is already verified
	 * @throws {HttpException} - Throws an error if the token generation fails
	 * @returns {Promise<string | Error>} - Returns the user's id or an error
	 */
	async resendVerificationEmail(email: string): Promise<string | Error> {
		const user = await this.usersService.getUserByEmail(email);
		if (!user) throw new NotFoundException('E-Mail konnte nicht gefunden werden');
		if (user.settings.is_verified) throw new ConflictException('E-Mail wurde schon verifiziert');

		const token = await this.encryptionService.generateToken(user.id);

		this.eventEmitter.emit('mail.verify-email', new SendVerifyMailEvent(user.id, user.email, user.first_name, token));

		return user.id;
	}

	/**
	 * @description - Sends a password reset email
	 * @param {EmailDTO} email - The user's email
	 * @throws {HttpException} - Throws an error if the email is not found
	 * @throws {HttpException} - Throws an error if the token generation fails
	 * @returns {Promise<string>} - Returns the user's id or an error
	 */
	async forgotPassword(email: string): Promise<string> {
		const user = await this.usersService.getUserByEmail(email);
		const token = await this.encryptionService.generateToken(user.id);

		this.eventEmitter.emit(
			'mail.forgot-password',
			new SendForgotPasswordMailEvent(user.id, user.email, user.first_name, token),
		);

		return user.id;
	}

	/**
	 * @description - Verifies a password reset token provided by the link in the email
	 * @param {string} userID - The user's id
	 * @param {string} token - The token to verify the user's password reset
	 * @throws {UnauthorizedException} - Throws an error if the token is invalid or expired
	 * @returns {Promise<string | Error>} - Returns the decrypted token or an error
	 */
	async verifyPasswordResetToken(userID: string, token: string): Promise<string | Error> {
		const existingToken = await this.encryptionService.getTokensByUserId(userID);
		if (!existingToken.includes(token))
			return new HttpException(
				'Der Token für das Zurücksetzen des Passworts ist ungültig oder abgelaufen',
				TOKEN_EXPIRED_ERROR_CODE,
			);

		const decryptedToken = await this.encryptionService.verifyToken(token);
		if (decryptedToken instanceof Error) return decryptedToken;

		return decryptedToken;
	}

	/**
	 * @description - Resets a user's password
	 * @param {ResetPasswordDTO} password - The user's new password
	 * @param {string} userID - The user's id
	 * @param {string} token - The token to verify the user's password reset
	 * @throws {NotFoundException} - Throws an error if the user is not found
	 * @throws {UnauthorizedException} - Throws an error if the email is not verified
	 * @throws {HttpException} - Throws an error if the new password is the same as the old password
	 * @returns {Promise<string | Error>} - Returns the user's id or an error
	 */
	async resetPassword({ password, userID, token }: ResetPasswordDTO): Promise<string | Error> {
		const user = await this.usersService.getUserByID(userID);
		if (!user.settings.is_verified) return new UnauthorizedException('Email not verified');

		if (await this.encryptionService.comparePassword(password, user.password))
			return new ConflictException('Das neue Passwort darf nicht mit dem alten Passwort identisch sein');

		const hashedPassword = await this.encryptionService.hashPassword(password);
		const updatedUserID = await this.usersService.updateUserCredentials(userID, { password: hashedPassword });
		await this.encryptionService.deleteToken(token);

		this.eventEmitter.emit('mail.password-changed', new PasswordChangedEvent(user.id, user.email, user.first_name));

		return updatedUserID;
	}
}
