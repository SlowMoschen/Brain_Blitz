import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Inject,
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
	ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { UserService } from '../shared/user/user.service';
import { UpdateUserCredentialsDTO } from './dto/update-user-credentials.dto';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersController {
	constructor(@Inject(UserService) private readonly userService: UserService) {}

	@ApiOkResponse({ description: 'returns user data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getCompleteUserBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;
		const user = await this.userService.getCompleteUserById(userID);
		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw new HttpException('User not found', 500);
		const { password, ...rest } = user;
		return { data: rest, message: 'User found' };
	}

	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch()
	async updateUserBySession(@Req() req: ReqWithUser, @Body() body: UpdateUserCredentialsDTO) {
		const userID = req.user.id;

		const user = await this.userService.updateUser(userID, body);
		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw new HttpException('User update failed', 500);

		return { data: user, message: 'User updated' };
	}

	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Delete()
	async deleteUserBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;

		const user = await this.userService.deleteUserById(userID);
		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw new HttpException('Deleting of User failed', 500);

		req.logout((err) => {
			if (err) throw new HttpException('Logout failed', 500);
		});

		return { data: user, message: 'User deleted' };
	}

	@ApiOkResponse({ description: 'returns all users data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no users were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getCompleteUsers() {
		const users = await this.userService.getCompleteUsers();

		if (!users) throw new NotFoundException('No users found');
		if (users instanceof Error) throw new HttpException('Query for users failed', 500);

		const usersWithoutPassword = users.map((user) => {
			const { password, ...rest } = user;
			return rest;
		});

		return { data: usersWithoutPassword, message: 'Users found' };
	}

	@ApiOkResponse({ description: 'returns data from a user without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getCompleteUserById(@Param('id') id: string) {
		const user = await this.userService.getCompleteUserById(id);
		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw new HttpException('Query for user failed', 500);

		const { password, ...rest } = user;
		
		return { data: rest, message: 'User found' };
	}

	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
		const user = await this.userService.updateUser(id, body);
		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw new HttpException('User update failed', 500);
		return { data: user, message: 'User updated' };
	}

	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		const user = await this.userService.deleteUserById(id);
		if (!user) throw new NotFoundException('No user found');
		if (user instanceof Error) throw new HttpException('Deleting of User failed', 500);
		return { data: user, message: 'User deleted' };
	}
}
