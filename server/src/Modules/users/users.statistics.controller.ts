import { Body, Controller, Get, HttpException, Inject, NotFoundException, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UsersStatisticsService } from '../shared/user/user.statistics.service';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { UpdateUserStatisticsDTO } from './dto/update-user-statistics.dto';
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users/statistics')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/statistics')
export class UsersStatisticsController {
	constructor(@Inject(UsersStatisticsService) private readonly usersStatisticsService: UsersStatisticsService) {}

	@ApiOperation({ summary: 'Get user statistics via session cookie' })
	@ApiOkResponse({ description: 'returns user statistics table' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserStatisticsBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;

        const stats = await this.usersStatisticsService.getUserStatisticsById(userID);
        if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw new HttpException('Query for statistics failed', 500);

        return { data: stats, message: 'Statistics found' };
	}

	@ApiOperation({ summary: 'Update user statistics via session cookie' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if updateing failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Patch()
	async updateUserStatisticsBySession(@Req() req: ReqWithUser, @Body() body: UpdateUserStatisticsDTO) {
		const userID = req.user.id;

        const stats = await this.usersStatisticsService.updateUserStatistics(userID, body);
        if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw new HttpException('Update of settings failed', 500);

        return { data: stats, message: 'Statistics updated' };
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get all user statistics' })
	@ApiOkResponse({ description: 'returns all user statistics' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getUserStatistics() {
        const stats = await this.usersStatisticsService.getUserStatistics();
        if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw new HttpException('Query for statistics failed', 500);

        return { data: stats, message: 'Statistics found' };
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user statistics by ID' })
	@ApiOkResponse({ description: 'returns user statistics table' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserStatisticsById(@Param('id') id: string){
        const stats = await this.usersStatisticsService.getUserStatisticsById(id);
        if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw new HttpException('Query for statistics failed', 500);

        return { data: stats, message: 'Statistics found' };
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user statistics by ID' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if update failed' })
	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateUserStatistics(@Param('id') id: string, @Body() body: UpdateUserStatisticsDTO){
        const stats = await this.usersStatisticsService.updateUserStatistics(id, body);
        if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw new HttpException('Update of statistics failed', 500);
		
        return { data: stats, message: 'Statistics updated' };
    }
}
