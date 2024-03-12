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
	@Render('email-verified')
	async verifyEmail(@Param('id') id: string, @Param('token') token: string, @Res() res) {
		const verified = await this.authService.verifyEmail(id, token);
		if (verified instanceof Error) {
			let message = '';
			let url = '';
			switch (verified.message) {
				case 'User not found':
					message = 'User not found';
					break;
				case 'Email already verified':
					message = 'Email already verified';
					break;
				case 'Your token is invalid or expired, please request a new one':
					message = 'Your token is invalid or expired, please request a new one';
					url = '/resend-email-verification';
					break;
				case 'Token does not match user':
					message = 'Token does not match user';
					break;
				default:
					message = 'Email verification failed';
					break;
			}
			return res.render('email-verified', { message, url });
		} else {
			return res.render('email-verified', {
				message: 'E-Mail wurde erfolgreich bestätigt',
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
		@Req() req: Request,
	): Promise<SuccessResponse | ErrorResponse> {
		const resent = await this.authService.resendVerificationEmail(verficiationDTO.email);
		if (resent instanceof HttpException)
			return this.responseHelperService.errorResponse(resent.getResponse().toString(), resent.getStatus(), 'Email resend failed', resent, {
				method: 'POST',
				url: req.url,
			});

		return this.responseHelperService.successResponse(200, 'Email resent', resent, { method: 'POST', url: req.url });
	}
}
