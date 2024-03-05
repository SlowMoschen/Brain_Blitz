import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user/user.service';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { UpdateUserCredentialsDTO } from './dto/update-user-credentials.dto';
import { ModifiedRequest } from 'src/Utils/Types/request.types';

@Controller('users')
export class UsersController {
	constructor(@Inject(UserService) private readonly userService: UserService) {}

	@Get()
	@UseGuards(AuthenticationGuard)
	async getCompleteUsers() {
		const users = await this.userService.getCompleteUsers();
		if (!users) throw new NotFoundException('No users found');
        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user;
            return rest;
        });
		return { data: usersWithoutPassword, message: 'Users found' };
	}

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async getCompleteUserById(@Param('id') id: string) {
        const user = await this.userService.getCompleteUserById(id);
        if (!user) throw new NotFoundException('No user found');
        const { password, ...rest } = user;
        return { data: rest, message: 'User found' };
    }

    @Get('user')
    @UseGuards(AuthenticationGuard)
    async getCompleteUserBySession(@Req() req: ModifiedRequest) {
        const userID = req.user.id;
        const user = await this.userService.getCompleteUserById(userID);
        if (!user) throw new NotFoundException('No user found');
        const { password, ...rest } = user;
        return { data: rest, message: 'User found' };
    } 

    @Put(':id')
    @UseGuards(AuthenticationGuard)
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserCredentialsDTO) {
        const user = await this.userService.updateUser(id, body);
        if (user instanceof Error) throw new NotFoundException('No user found');
        return { data: user, message: 'User updated' };
    }

    @Put('user')
    @UseGuards(AuthenticationGuard)
    async updateUserBySession(@Req() req: ModifiedRequest, @Body() body: UpdateUserCredentialsDTO) {
        const userID = req.user.id;
        const user = await this.userService.updateUser(userID, body);
        if (user instanceof Error) throw new NotFoundException('No user found');
        return { data: user, message: 'User updated' };
    }

    @Delete(':id')
    @UseGuards(AuthenticationGuard)
    async deleteUser(@Param('id') id: string) {
        const user = await this.userService.deleteUserById(id);
        if (user instanceof Error) throw new NotFoundException('No user found')
        return { data: user, message: 'User deleted' };
    }
}
