import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from 'src/Guards/localAuth.guard';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { ApiConflictResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({ description: 'returns message if login was successful' })
    @ApiNotFoundResponse({ description: 'if login failed due to not finding entered email' })
    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login() {
        return { message: 'Login successful' };
    }

    @ApiOkResponse({ description: 'returns message if logout was successful' })
    @ApiInternalServerErrorResponse({ description: 'if logout failed' })
    @Post('logout')
    async logout(@Req() req) {
        req.logout((err) => {
            if (err) throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return { message: 'Logout successful' };
    }

    @ApiOkResponse({ description: 'returns message if session is authorized' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie' })
    @Get('session')
    async session(@Req() req: ReqWithUser) {
        console.log(req.user);
        if (!req.user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        return { message: 'Authorized' };
    }

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
        };
        return { data: user, message: 'User created' };
    }

}
