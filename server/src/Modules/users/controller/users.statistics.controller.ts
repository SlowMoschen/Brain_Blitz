import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
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
import { UpdateUserStatisticsDTO } from '../dto/update-user-statistics.dto';
import { UsersService } from '../users.service';
import { User } from 'src/Decorators/user.decorator';

@ApiTags('users/statistics')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/statistics')
export class UsersStatisticsController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: 'Get user statistics via session cookie' })
	@ApiOkResponse({ description: 'returns user statistics table' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserStatisticsBySession(@User('id') id: string){
		const stats = await this.usersService.getStatistics(id);

		if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw stats;

		return stats;
	}

	@ApiOperation({ summary: 'Update user statistics via session cookie' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if updateing failed' })
	@UsePipes(new ValidationPipe())
	@Roles(Role.USER, Role.ADMIN)
	@Patch()
	async updateUserStatisticsBySession(
		@User('id') id: string,
		@Body() body: UpdateUserStatisticsDTO,
	) {
		const stats = await this.usersService.updateStatistics(id, body);

		if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw stats;

		return stats;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user statistics by ID' })
	@ApiOkResponse({ description: 'returns user statistics table' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserStatisticsById(@Param('id') id: string) {
		const stats = await this.usersService.getStatistics(id);

		if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw stats;

		return stats;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user statistics by ID' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if update failed' })
	@UsePipes(new ValidationPipe())
	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateUserStatistics(@Param('id') id: string, @Body() body: UpdateUserStatisticsDTO) {
		const stats = await this.usersService.updateStatistics(id, body);

		if (!stats) throw new NotFoundException('No statistics found');
		if (stats instanceof Error) throw stats;

		return stats;
	}
}
