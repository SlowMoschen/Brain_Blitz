import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/Guards/localAuth.guard';
import { create } from 'domain';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login() {
        return { message: 'Login successful' };
    }

    @Post('logout')
    async logout(@Req() req) {
        req.logout((err) => {
            if (err) throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
        });
        return { message: 'Logout successful' };
    }

    @Get('session')
    async session(@Req() req) {
        if (!req.user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        return { message: 'Authorized' };
    }

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
