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

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('dev')
	async dev() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Get user data via session cookie' })
	@ApiOkResponse({ description: 'returns user data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getCompleteUserBySession(@User('id') id: string){
		const user = await this.usersService.getUserByID(id);

		if (!user) throw new NotFoundException('No user found');
		if (user instanceof HttpException) throw user;

		return [user];
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
		const updatedUsers = await this.usersService.updateUserCredentials(id, body);

		if (!updatedUsers) throw new NotFoundException('No user found');
		if (updatedUsers instanceof Error) throw updatedUsers;

		return updatedUsers;
	}

	@ApiOperation({ summary: 'Delete user data via session cookie' })
	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Delete()
	async deleteUserBySession(@User('id') id: string, @Req() req: Request){
		const deletedUser = await this.usersService.deleteUser(id);

		if (!deletedUser) throw new NotFoundException('No user found');
		if (deletedUser instanceof HttpException) throw deletedUser;

		req.logout((err) => {
			if (err) throw new Error('Logout failed');
		});

		return deletedUser;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get all users data' })
	@ApiOkResponse({ description: 'returns all users data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no users were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getCompleteUsers() {
		const users = await this.usersService.getAllUsers();

		if (!users) throw new NotFoundException('No users found');
		if (users instanceof Error) throw users;

		return users;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user data via userID' })
	@ApiOkResponse({ description: 'returns data from a user without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getCompleteUserById(@Param('id') id: string) {
		const user = await this.usersService.getUserByID(id);

		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw user;

		return [user];
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user data via userID' })
	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
		const updatedUser = await this.usersService.updateUserCredentials(id, body);

		if (!updatedUser) throw new NotFoundException('No user found');
		if (updatedUser instanceof Error) throw updatedUser;

		return updatedUser;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Delete user data via userID' })
	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		const deletedUser = await this.usersService.deleteUser(id);
		
		if (!deletedUser) throw new NotFoundException('No user found');
		if (deletedUser instanceof Error) throw deletedUser;

		return deletedUser;
	}
}
