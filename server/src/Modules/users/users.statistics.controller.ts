import {
	Body,
	Controller,
	Get,
	HttpException,
	NotFoundException,
	Param,
	Patch,
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
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { ResponseHelperService } from '../shared/responseHelper.service';
import { UpdateUserStatisticsDTO } from './dto/update-user-statistics.dto';
import { UsersService } from './users.service';
import { ErrorResponse, SuccessResponse } from 'src/Utils/Types/response.types';
import { Request } from 'express';

@ApiTags('users/statistics')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/statistics')
export class UsersStatisticsController {
	constructor(
		private readonly usersService: UsersService,
		private readonly responseHelperService: ResponseHelperService,
	) {}

	@ApiOperation({ summary: 'Get user statistics via session cookie' })
	@ApiOkResponse({ description: 'returns user statistics table' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserStatisticsBySession(@Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const stats = await this.usersService.getStatistics(userID);

		if (!stats)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No statistics found',
				new NotFoundException('No statistics found'),
				{ method: 'GET', url: req.url },
			);

		if (stats instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Query for statistics failed',
				new HttpException('Query for statistics failed', 500),
				{ method: 'GET', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Statistics found', stats, { method: 'GET', url: req.url });
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
		@Req() req: Request,
		@Body() body: UpdateUserStatisticsDTO,
	): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const stats = await this.usersService.updateStatistics(userID, body);

		if (!stats)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No statistics found',
				new NotFoundException('No statistics found'),
				{ method: 'PATCH', url: req.url },
			);

		if (stats instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Update of statistics failed',
				new HttpException('Update of statistics failed', 500),
				{ method: 'PATCH', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Statistics updated', stats, {
			method: 'PATCH',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user statistics by ID' })
	@ApiOkResponse({ description: 'returns user statistics table' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserStatisticsById(@Param('id') id: string, @Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const stats = await this.usersService.getStatistics(id);

		if (!stats)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No statistics found',
				new NotFoundException('No statistics found'),
				{ method: 'GET', url: req.url },
			);

		if (stats instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Query for statistics failed',
				new HttpException('Query for statistics failed', 500),
				{ method: 'GET', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Statistics found', stats, { method: 'GET', url: req.url });
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user statistics by ID' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no statistics were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if update failed' })
	@UsePipes(new ValidationPipe())
	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateUserStatistics(@Param('id') id: string, @Body() body: UpdateUserStatisticsDTO, @Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const stats = await this.usersService.updateStatistics(id, body);

		if (!stats)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No statistics found',
				new NotFoundException('No statistics found'),
				{ method: 'PATCH', url: req.url },
			);

		if (stats instanceof Error)

			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Update of statistics failed',
				new HttpException('Update of statistics failed', 500),
				{ method: 'PATCH', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Statistics updated', stats, { method: 'PATCH', url: req.url });
	}
}
