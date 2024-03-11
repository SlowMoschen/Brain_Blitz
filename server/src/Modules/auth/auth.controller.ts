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
import { LocalAuthGuard } from 'src/Guards/localAuth.guard';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { ResendVerificationEmailDto } from './dto/resendVerficationEmail.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login user' })
	@ApiOkResponse({ description: 'returns message if login was successful' })
	@ApiNotFoundResponse({ description: 'if login failed due to not finding entered email' })
	@ApiBody({ description: 'email and password', type: LoginUserDTO })
	@Post('login')
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	async login() {
		return { message: 'Login successful' };
	}

	@ApiOperation({ summary: 'Logout user' })
	@ApiOkResponse({ description: 'returns message if logout was successful' })
	@ApiInternalServerErrorResponse({ description: 'if logout failed' })
	@Post('logout')
	async logout(@Req() req) {
		req.logout((err) => {
			if (err) throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
		});
		return { message: 'Logout successful' };
	}

	@ApiOperation({ summary: 'Check if user is authorized' })
	@ApiOkResponse({ description: 'returns message if session is authorized' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@Get('session')
	async session(@Req() req: ReqWithUser) {
		if (!req.user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		return { message: 'Authorized' };
	}

	@ApiOperation({ summary: 'Register user' })
	@ApiOkResponse({ description: 'returns userID if user was created' })
	@ApiConflictResponse({ description: 'if user with this email already exists' })
	@ApiInternalServerErrorResponse({ description: 'if user creation failed' })
	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() createUserDTO: CreateUserDTO) {
		const user = await this.authService.createUser(createUserDTO);
		if (user instanceof Error) {
			if (user.message === 'User with this email already exists') {
				throw new HttpException(user.message, HttpStatus.CONFLICT);
			}

			if (user.message === 'User creation failed') {
				throw new HttpException(user.message, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return { data: user, message: 'User created' };
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
	async resendEmailVerification(@Body() verficiationDTO: ResendVerificationEmailDto) {
		const resent = await this.authService.resendVerificationEmail(verficiationDTO.email);
		if (resent instanceof Error) {
			if (resent.message === 'Email not found') {
				throw new HttpException(resent.message, HttpStatus.NOT_FOUND);
			}

			if (resent.message === 'Email already verified') {
				throw new HttpException(resent.message, HttpStatus.CONFLICT);
			}

			if (resent.message === 'Email resend failed') {
				throw new HttpException(resent.message, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return { message: 'Email resent' };
	}
}
