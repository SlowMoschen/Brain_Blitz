import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Render,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
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
import { LocalAuthGuard } from 'src/Guards/localAuth.guard';
import { ErrorResponse, SuccessResponse } from 'src/Utils/Types/response.types';
import { ResponseHelperService } from '../shared/responseHelper.service';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { ResendVerificationEmailDto } from './dto/resendVerficationEmail.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly responseHelperService: ResponseHelperService,
	) {}

	@ApiOperation({ summary: 'Login user' })
	@ApiOkResponse({ description: 'returns message if login was successful' })
	@ApiNotFoundResponse({ description: 'if login failed due to not finding entered email' })
	@ApiBody({ description: 'email and password', type: LoginUserDTO })
	@Post('login')
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	async login(): Promise<SuccessResponse | ErrorResponse> {
		return this.responseHelperService.successResponse(200, 'Login successful', null, { method: 'POST', url: '/auth/login' });
	}

	@ApiOperation({ summary: 'Logout user' })
	@ApiOkResponse({ description: 'returns message if logout was successful' })
	@ApiInternalServerErrorResponse({ description: 'if logout failed' })
	@Post('logout')
	async logout(@Req() req: Request): Promise<SuccessResponse | ErrorResponse>{
		req.logout((err) => {
			if (err) return this.responseHelperService.errorResponse('Internal Server Error', 500, 'Logout failed', err, { method: 'POST', url: req.url });
		});
		return this.responseHelperService.successResponse(200, 'Logout successful', null, { method: 'POST', url: req.url });
	}

	@ApiOperation({ summary: 'Check if user is authorized' })
	@ApiOkResponse({ description: 'returns message if session is authorized' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@Get('session')
	async session(@Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		if (!req.user)
			return this.responseHelperService.errorResponse(
				'Forbidden',
				403,
				'No session cookie',
				new HttpException('No session cookie', HttpStatus.FORBIDDEN),
				{ method: 'GET', url: req.url },
			);
		return this.responseHelperService.successResponse(200, 'Session authorized', req.user.id, {
			method: 'GET',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'Register user' })
	@ApiOkResponse({ description: 'returns userID if user was created' })
	@ApiConflictResponse({ description: 'if user with this email already exists' })
	@ApiInternalServerErrorResponse({ description: 'if user creation failed' })
	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() createUserDTO: CreateUserDTO, @Req() req): Promise<SuccessResponse | ErrorResponse> {
		const user = await this.authService.createUser(createUserDTO);

		if (user instanceof Error) {
			if (user.message === 'User with this email already exists')
				return this.responseHelperService.errorResponse('Conflict', 409, 'User with this email already exists', user, {
					method: 'POST',
					url: req.url,
				});

			return this.responseHelperService.errorResponse('Internal Server Error', 500, 'User creation failed', user, {
				method: 'POST',
				url: req.url,
			});
		}

		return this.responseHelperService.successResponse(200, 'User created', user, { method: 'POST', url: req.url });
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
			let data: {header?: string, message?: string, url?: string} = new Object();
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
					data.url= '/auth/resend-email-verification';
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
	@ApiOkResponse({ description: 'returns message if email was resent' })
	@ApiNotFoundResponse({ description: 'if user not found' })
	@ApiConflictResponse({ description: 'if email already verified' })
	@ApiInternalServerErrorResponse({ description: 'if email resend failed' })
	@Post('resend-email-verification')
	@UsePipes(new ValidationPipe())
	async resendEmailVerification(
		@Body() verficiationDTO: ResendVerificationEmailDto,
		@Res() res,
	): Promise<SuccessResponse | ErrorResponse> {
		const resent = await this.authService.resendVerificationEmail(verficiationDTO.email);
		if (resent instanceof HttpException)
			return res.render('email-not-verified', { header: 'Senden fehlgeschlagen', message: resent.message, url: '/auth/resend-email-verification' });

		return res.render('email-not-verified', { header: 'E-Mail wurde erneut gesendet', message: 'Bitte überprüfe deine E-Mails'});
	}

	@ApiOperation({ summary: 'Render page to request a new verification email' })
	@ApiOkResponse({ description: 'renders the Handlebars view for resending a verification email' })
	@Render('email-not-verified')
	@Get('resend-email-verification')
	async resendEmailVerificationPage() {
		return { header: 'Verifikation erneut durchführen', message: 'Bitte gib deine E-Mail ein', url: '/auth/resend-email-verification'};
	}
}
