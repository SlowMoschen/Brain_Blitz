import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SelectUserWithoutPassword } from 'src/Utils/Types/model.types';
import { MailService } from '../mail/mail.service';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly encryptionService: EncryptionService,
		private readonly mailService: MailService,
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
	 * @returns {Promise<string | Error>} - Returns the user's id or an error
	 */
	async createUser(createUserDTO: CreateUserDTO): Promise<string | Error> {
		const hashedPassword = await this.encryptionService.hashPassword(createUserDTO.password);

		const createdUser = await this.usersService.createNewUser({ ...createUserDTO, password: hashedPassword });
		
		if (createdUser instanceof Error) {
			if (createdUser.message === 'User with this email already exists') {
				return new HttpException('User with this email already exists', HttpStatus.CONFLICT);
			}
			return createdUser;
		}
		
		const userID = createdUser.id;
		
		const token = await this.encryptionService.generateToken(userID);
		if (token instanceof Error) {
			await this.usersService.deleteUser(userID);
			return new HttpException('Token generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
		} 

		const mail = await this.mailService.sendConfirmationEmail(createdUser, token);
		if (mail instanceof Error) {
			await this.usersService.deleteUser(userID);
			return new HttpException('Sending email failed', HttpStatus.INTERNAL_SERVER_ERROR)
		} 

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
	 * @returns {Promise<string | Error>} - Returns the user's id or an error
	 */
	async verifyEmail(userID: string, token: string): Promise<string | Error> {
		try {
			const user = await this.usersService.getUserByID(userID);
            if (Array.isArray(user) && user.length === 0) return new NotFoundException('User not found');
            if (user instanceof Error) return user;

            if (user.settings.is_verified) return new HttpException('Email already verified', HttpStatus.CONFLICT);

            const existingToken = await this.encryptionService.getTokensByUserId(userID);
            if (existingToken instanceof Error) return existingToken;
            if (!existingToken.includes(token)) return new UnauthorizedException('Token is invalid or expired, please request a new one');

            const isTokenValid = await this.encryptionService.verifyToken(token);
            if (isTokenValid instanceof Error) return isTokenValid;

            await this.encryptionService.deleteToken(token);
            await this.usersService.setVerificationStatus(userID, true);

            return userID;
		} catch (error) {
			return error;
		}
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
        if (user instanceof Error) return user;
        if (!user) return new HttpException('E-Mail konnte nicht gefunden werden', HttpStatus.NOT_FOUND);
		
        if (user.settings.is_verified) return new HttpException('E-Mail wurde schon verifiziert', HttpStatus.CONFLICT);

        const token = await this.encryptionService.generateToken(user.id);
        if (token instanceof Error) return new HttpException('Generieren vom Token fehlgeschlagen', HttpStatus.INTERNAL_SERVER_ERROR);

        await this.mailService.sendConfirmationEmail(user, token);

        return user.id;
	}
}
