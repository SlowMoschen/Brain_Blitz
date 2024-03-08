import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../shared/user/user.service';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { UpdateUserCredentialsDTO } from './dto/update-user-credentials.dto';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UserTimestampsService } from '../shared/user/user.timestamps.service';

@Controller('users')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersController {
	constructor(
		@Inject(UserService) private readonly userService: UserService,
		@Inject(UserTimestampsService) private readonly timestampService: UserTimestampsService,
	) {}

	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getCompleteUserBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;
		const user = await this.userService.getCompleteUserById(userID);
		if (!user) throw new NotFoundException('No user found');
		const { password, ...rest } = user;
		return { data: rest, message: 'User found' };
	}

	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Put()
	async updateUserBySession(@Req() req: ReqWithUser, @Body() body: UpdateUserCredentialsDTO) {
		const userID = req.user.id;
		const user = await this.userService.updateUser(userID, body);
		if (user instanceof Error) throw new NotFoundException('No user found');
		return { data: user, message: 'User updated' };
	}

	@Roles(Role.USER, Role.ADMIN)
	@Delete()
	async deleteUserBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;
		const user = await this.userService.deleteUserById(userID);
		if (user instanceof Error) throw new NotFoundException('No user found');
		return { data: user, message: 'User deleted' };
	}

	@Roles(Role.ADMIN)
	@Get('all')
	async getCompleteUsers() {
		const users = await this.userService.getCompleteUsers();
		if (!users) throw new NotFoundException('No users found');
		const usersWithoutPassword = users.map((user) => {
			const { password, ...rest } = user;
			return rest;
		});
		return { data: usersWithoutPassword, message: 'Users found' };
	}

	@Roles(Role.ADMIN)
	@Get(':id')
	async getCompleteUserById(@Param('id') id: string) {
		const user = await this.userService.getCompleteUserById(id);
		if (!user) throw new NotFoundException('No user found');
		const { password, ...rest } = user;
		return { data: rest, message: 'User found' };
	}

	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateUser(@Param('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
		const user = await this.userService.updateUser(id, body);
		if (user instanceof Error) throw new NotFoundException('No user found');
		return { data: user, message: 'User updated' };
	}

	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteUser(@Param('id') id: string) {
		const user = await this.userService.deleteUserById(id);
		if (user instanceof Error) throw new NotFoundException('No user found');
		return { data: user, message: 'User deleted' };
	}
}
