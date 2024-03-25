import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
	ApiBody,
	ApiConflictResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/Decorators/user.decorator';
import { UserLogEvent } from 'src/Events/user.events';
import { LocalAuthGuard } from 'src/Guards/localAuth.guard';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { EmailDTO } from './dto/email.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@ApiOperation({ summary: 'Login user' })
	@ApiOkResponse({ description: 'returns message if login was successful' })
	@ApiNotFoundResponse({ description: 'if login failed due to not finding entered email' })
	@ApiBody({ description: 'email and password', type: LoginUserDTO })
	@Post('login')
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	async login(@User('id') id: string) {
		this.eventEmitter.emit('user.login', new UserLogEvent(id));
		return { message: 'Login successful' };
	}

	@ApiOperation({ summary: 'Logout user' })
	@ApiOkResponse({ description: 'returns message if logout was successful' })
	@ApiInternalServerErrorResponse({ description: 'if logout failed' })
	@Post('logout')
	async logout(@Req() req: Request) {
		req.logout((err) => {
			if (err) throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
		});
		this.eventEmitter.emit('user.logout', new UserLogEvent(req.user.id));
		return { message: 'Logout successful' };
	}

	@ApiOperation({ summary: 'Check if user is authorized' })
	@ApiOkResponse({ description: 'returns message if session is authorized' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@Get('session')
	async session(@Req() req: Request) {
		if (!req.user) throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
		return { message: 'Authorized' };
	}

	@ApiOperation({ summary: 'Register user' })
	@ApiOkResponse({ description: 'returns userID if user was created' })
	@ApiConflictResponse({ description: 'if user with this email already exists' })
	@ApiInternalServerErrorResponse({ description: 'if user creation failed' })
	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() createUserDTO: CreateUserDTO) {
		return await this.authService.createUser(createUserDTO);
	}

	@ApiOperation({ summary: 'verify User with provided link in sent email' })
	@ApiOkResponse({ description: 'returns message if email was verified' })
	@ApiNotFoundResponse({ description: 'if user not found' })
	@ApiConflictResponse({ description: 'if email already verified' })
	@ApiForbiddenResponse({ description: 'if token does not match user' })
	@ApiInternalServerErrorResponse({ description: 'if email verification failed' })
	@Get('verify-email/:id/:token')
	async verifyEmail(@Param('id') id: string, @Param('token') token: string, @Res() res) {
		const verified = await this.authService.verifyEmail(id, token);
		if (verified instanceof Error) {
			let data: { header?: string; message?: string; url?: string } = new Object();
			switch (verified.message) {
				case 'User not found':
					data.header = 'Der Benutzer wurde nicht gefunden';
					data.message = 'Bitte registriere dich erneut';
					break;
				case 'Email already verified':
					// ! This is a workaround for the frontend. When clicking on the link in the email. 2 requests are sent. The first one will verify the email and the second one will throw this error. This is a workaround for the frontend to display the correct message.
					data.header = 'E-Mail wurde erfolgreich bestätigt';
					data.message = 'Du kannst dich jetzt einloggen';
					data.url = process.env.LOGIN_REDIRECT_URL;
					return res.render('email-verified', data);
				case 'Your token is invalid or expired, please request a new one':
					data.header = 'Der Verifizierungslink ist ungültig oder abgelaufen';
					data.message = 'Fordere erneut eine E-Mail an';
					data.url = '/auth/resend-email-verification';
					break;
				case 'Token does not match user':
					data.header = 'Verifizierungslink passt nicht zum Benutzer';
					data.message = 'Bitte fordere eine neue E-Mail an';
					data.url = '/auth/resend-email-verification';
					break;
				default:
					data.header = 'E-Mail Verifizierung fehlgeschlagen';
					data.message = 'Bitte schreibe unseren Support an';
					break;
			}
			return res.render('email-not-verified', data);
		} else {
			return res.render('email-verified', {
				header: 'E-Mail wurde erfolgreich bestätigt',
				message: 'Du kannst dich jetzt einloggen',
				url: process.env.LOGIN_REDIRECT_URL,
			});
		}
	}

	@ApiOperation({ summary: 'Resend email verification' })
	@ApiOkResponse({ description: 'returns message if email was sent' })
	@ApiNotFoundResponse({ description: 'if user not found' })
	@ApiConflictResponse({ description: 'if email already verified' })
	@ApiInternalServerErrorResponse({ description: 'if email sending failed' })
	@Throttle({ default: { limit: 1, ttl: 60 * 60 * 24 * 1000 } })
	@Post('resend-email-verification')
	@UsePipes(new ValidationPipe())
	async resendEmailVerification(@Body() { email }: EmailDTO) {
		const resentMail = await this.authService.resendVerificationEmail(email);
		return { message: 'E-Mail wurde erfolgreich gesendet', userID: resentMail };
	}

	@ApiOperation({ summary: 'Sends an email for reseting user password' })
	@ApiOkResponse({ description: 'returns message if email was sent' })
	@ApiNotFoundResponse({ description: 'if user not found' })
	@ApiInternalServerErrorResponse({ description: 'if email sending failed' })
	@ApiBody({ description: 'email', type: EmailDTO })
	@Throttle({ default: { limit: 3, ttl: 60 * 60 * 24 * 1000 } })
	@Post('forgot-password')
	@UsePipes(new ValidationPipe())
	async forgotPassword(@Body() { email }: EmailDTO) {
		const forgot = await this.authService.forgotPassword(email);
		return { message: 'E-Mail wurde erfolgreich gesendet', userID: forgot };
	}

	@ApiOperation({ summary: 'Render page to reset user password' })
	@ApiOkResponse({ description: 'renders the Handlebars view for resetting the password' })
	@ApiNotFoundResponse({ description: 'if user or token is not found' })
	@ApiForbiddenResponse({ description: 'if token does not match user' })
	@Get('reset-password/:id/:token')
	async resetPassword(@Param('id') id: string, @Param('token') token: string, @Res() res) {
		const userID = await this.authService.verifyPasswordResetToken(id, token);
		if (userID instanceof Error) return res.render('reset-password', { error: userID.message });
		if (userID !== id)
			return res.render('reset-password', { error: 'Der Token stimmt nicht mit der User ID überein.' });

		return res.render('reset-password', { userID, token });
	}

	@ApiOperation({ summary: 'Reset user password' })
	@ApiOkResponse({ description: 'returns message if password was reset' })
	@ApiInternalServerErrorResponse({ description: 'if password reset failed' })
	@ApiBody({ description: 'new password and user id', type: ResetPasswordDTO })
	@Post('reset-password')
	@UsePipes(new ValidationPipe())
	async resetPasswordPost(@Body() body: ResetPasswordDTO) {
		const reset = await this.authService.resetPassword(body);
		if (reset instanceof Error) throw reset;
		return {
			message: 'Passwort wurde erfolgreich zurückgesetztz, du kannst diese Seite nun schließen.',
			userID: reset,
		};
	}
}
