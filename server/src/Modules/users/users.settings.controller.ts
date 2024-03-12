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
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { ErrorResponse, SuccessResponse } from 'src/Utils/Types/response.types';
import { ResponseHelperService } from '../shared/responseHelper.service';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@ApiTags('users/settings')
@Controller('users/settings')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersSettingsController {
	constructor(
		private readonly usersService: UsersService,
		private readonly responseHelperService: ResponseHelperService,
	) {}

	@ApiOperation({ summary: 'Get user settings via session cookie' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserSettingsBySession(@Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const settings = await this.usersService.getSettings(userID);

		if (!settings)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No settings found',
				new NotFoundException('No settings found'),
				{ method: 'GET', url: req.url },
			);

		if (settings instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Query for settings failed',
				new HttpException('Query for settings failed', 500),
				{ method: 'GET', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Settings found', settings, { method: 'GET', url: req.url });
	}

	@ApiOperation({ summary: 'Update user settings via session cookie' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch()
	async updateUserSettingsBySession(
		@Req() req: Request,
		@Body() body: UpdateUserSettingsDTO,
	): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;
		const userRole = req.user.roles;

		if (userRole[0] === Role.USER && body.roles)
			return this.responseHelperService.errorResponse(
				'Forbidden',
				403,
				'User is not allowed to change roles',
				new HttpException('User is not allowed to change roles', 403),
				{ method: 'PATCH', url: req.url },
			);

		const updatedSettings = await this.usersService.updateSettings(userID, body);

		if (!updatedSettings)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No settings found',
				new NotFoundException('No settings found'),
				{ method: 'PATCH', url: req.url },
			);

		if (updatedSettings instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Update of settings failed',
				new HttpException('Update of settings failed', 500),
				{ method: 'PATCH', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Settings updated', updatedSettings, {
			method: 'PATCH',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user settings by ID' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserSettingsById(id: string, @Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const settings = await this.usersService.getSettings(id);

		if (!settings)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No settings found',
				new NotFoundException('No settings found'),
				{ method: 'GET', url: req.url },
			);

		if (settings instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Query for settings failed',
				new HttpException('Query for settings failed', 500),
				{ method: 'GET', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Settings found', settings, { method: 'GET', url: req.url });
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user settings by ID' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateUserSettings(@Param('id') userID: string, @Body() body: UpdateUserSettingsDTO, @Req() req: Request): Promise<SuccessResponse | ErrorResponse>{
		const updatedSettings = await this.usersService.updateSettings(userID, body);

		if (!updatedSettings)
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No settings found',
				new NotFoundException('No settings found'),
				{ method: 'PATCH', url: req.url },
			);

		if (updatedSettings instanceof Error)
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Update of settings failed',
				new HttpException('Update of settings failed', 500),
				{ method: 'PATCH', url: req.url },
			);

		return this.responseHelperService.successResponse(200, 'Settings updated', updatedSettings, { method: 'PATCH', url: req.url });
	}
}
