import { Body, Controller, Get, Inject, NotFoundException, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UsersStatisticsService } from '../shared/user/user.statistics.service';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { UpdateUserStatisticsDTO } from './dto/update-user-statistics.dto';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/statistics')
export class UsersStatisticsController {
	constructor(@Inject(UsersStatisticsService) private readonly usersStatisticsService: UsersStatisticsService) {}

	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserStatisticsBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;
        const stats = await this.usersStatisticsService.getUserStatisticsById(userID);
        if (!stats) throw new NotFoundException('No statistics found');
        return { data: stats, message: 'Statistics found' };
	}

	@Roles(Role.USER, Role.ADMIN)
	@Patch()
	async updateUserStatisticsBySession(@Req() req: ReqWithUser, @Body() body: UpdateUserStatisticsDTO) {
		const userID = req.user.id;
        const stats = await this.usersStatisticsService.updateUserStatistics(userID, body);
        if (!stats) throw new NotFoundException('No statistics found');
        return { data: stats, message: 'Statistics updated' };
	}

	@Roles(Role.ADMIN)
	@Get('all')
	async getUserStatistics() {
        const stats = await this.usersStatisticsService.getUserStatistics();
        if (!stats) throw new NotFoundException('No statistics found');
        return { data: stats, message: 'Statistics found' };
	}

	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserStatisticsById(@Param('id') id: string){
        const stats = await this.usersStatisticsService.getUserStatisticsById(id);
        if (!stats) throw new NotFoundException('No statistics found');
        return { data: stats, message: 'Statistics found' };
	}

	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateUserStatistics(@Param('id') id: string, @Body() body: UpdateUserStatisticsDTO){
        const stats = await this.usersStatisticsService.updateUserStatistics(id, body);
        if (!stats) throw new NotFoundException('No statistics found');
        return { data: stats, message: 'Statistics updated' };
    }
}
