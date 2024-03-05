import { Body, Controller, Get, Inject, NotFoundException, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user/user.service';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { UpdateUserCredentialsDTO } from './dto/update-user-credentials.dto';

@Controller('users')
export class UsersController {
	constructor(@Inject(UserService) private readonly userService: UserService) {}

	@Get()
	@UseGuards(AuthenticationGuard)
	async getCompleteUsers() {
		const users = await this.userService.getCompleteUser();
		if (!users) throw new NotFoundException('No users found');
		return { data: users, message: 'Users found' };
	}

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async getCompleteUserById(@Param('id') id: string) {
        const user = await this.userService.getCompleteUserById(id);
        if (!user) throw new NotFoundException('No user found');
        return { data: user, message: 'User found' };
    }

    @Put(':id')
    @UseGuards(AuthenticationGuard)
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
        const user = await this.userService.updateUser(id, body);
        if (!user) throw new NotFoundException('No user found');
        return { data: user, message: 'User updated' };
    }
}
