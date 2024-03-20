import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	NotFoundException,
	Param,
	Patch,
	Put,
	Req,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UpdateUserCredentialsDTO } from '../dto/update-user-credentials.dto';
import { UsersService } from '../users.service';
import { User } from 'src/Decorators/user.decorator';
import { UserDataInterceptor } from 'src/Interceptors/userData.interceptor';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Get user data via session cookie' })
	@ApiOkResponse({ description: 'returns user data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@UseInterceptors(new UserDataInterceptor())
	@Get()
	async getCompleteUserBySession(@User('id') id: string) {
		return await this.usersService.getUserByID(id);
	}

	@ApiOperation({ summary: 'Update user data via session cookie' })
	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch()
	async updateUserCredentialsBySession(@User('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
		return await this.usersService.updateUserCredentials(id, body);
	}

	@ApiOperation({ summary: 'Delete user data via session cookie' })
	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Delete()
	async deleteUserBySession(@User('id') id: string, @Req() req: Request) {
		req.session.destroy((err) => {
			if (err) throw new Error('Session destroy failed');
		});
		req.logout((err) => {
			if (err) throw new Error('Logout failed');
		});
		return await this.usersService.deleteUser(id);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get all users data' })
	@ApiOkResponse({ description: 'returns all users data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no users were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@UseInterceptors(new UserDataInterceptor())
	@Get('all')
	async getCompleteUsers() {
		return await this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user data via userID' })
	@ApiOkResponse({ description: 'returns data from a user without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@UseInterceptors(new UserDataInterceptor())
	@Get(':id')
	async getCompleteUserById(@Param('id') id: string) {
		return await this.usersService.getUserByID(id);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user data via userID' })
	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateUser(@Param('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
		return await this.usersService.updateUserCredentials(id, body);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Delete user data via userID' })
	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		return await this.usersService.deleteUser(id);
	}
}
