import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SelectUserWithoutPassword } from 'src/Utils/Types/model.types';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { TokenService } from '../shared/token/token.service';
import { UserService } from '../shared/user/user.service';
import { SettingsService } from '../shared/user/user.settings.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
        private readonly tokenService: TokenService,
        private readonly settingsService: SettingsService,
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
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const userSettings = await this.settingsService.getUserSettingsById(user.id);
        if (!userSettings) throw new NotFoundException('User settings not found');
        if (!userSettings.is_verified) throw new UnauthorizedException('Email not verified');

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
        const user = await this.userService.getUserByEmail(createUserDTO.email);
        if (user) return new HttpException('User with this email already exists', HttpStatus.CONFLICT);

        const newUser = await this.userService.insertNewUser(createUserDTO);
        if (newUser instanceof Error) return newUser;
        
        const token = await this.tokenService.generateToken(newUser.id);
        if (!token) return new HttpException('Token generation failed', HttpStatus.INTERNAL_SERVER_ERROR);

        await this.mailService.sendConfirmationEmail(newUser, token);

        return newUser.id;
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
            const { settings, ...user } = await this.userService.getCompleteUserById(userID);
    
            if (!user) throw new NotFoundException('User not found');
            if (settings.is_verified) throw new HttpException('Email already verified', HttpStatus.CONFLICT);
    
            const decodedToken = await this.tokenService.verifyToken(token);
            if (!decodedToken) throw new NotFoundException('Your token is invalid or expired, please request a new one');
            if (decodedToken.userID !== userID) throw new UnauthorizedException('Token does not match user');
    
            await this.settingsService.setVerification(userID, true);
            await this.tokenService.deleteToken(token);
    
            return userID;
        } catch (error) {
            return error;
        }
    }
}
