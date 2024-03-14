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
import { Request } from 'express';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { UsersService } from './users.service';

@ApiTags('users/settings')
@Controller('users/settings')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersSettingsController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: 'Get user settings via session cookie' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserSettingsBySession(@Req() req: Request) {
		const userID = req.user.id;
		const settings = await this.usersService.getSettings(userID);

		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw settings;

		return settings;
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
	) {
		const userID = req.user.id;
		const userRole = req.user.roles;
		if (userRole[0] === Role.USER && body.roles) throw new HttpException('Forbidden', 403);
		
		const updatedSettings = await this.usersService.updateSettings(userID, body);

		if (!updatedSettings) throw new NotFoundException('No settings found');
		if (updatedSettings instanceof Error) throw updatedSettings;

		return updatedSettings;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user settings by ID' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserSettingsById(id: string, @Req() req: Request) {
		const settings = await this.usersService.getSettings(id);

		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw settings;

		return settings;
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user settings by ID' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateUserSettings(@Param('id') userID: string, @Body() body: UpdateUserSettingsDTO){
		const updatedSettings = await this.usersService.updateSettings(userID, body);

		if (!updatedSettings) throw new NotFoundException('No settings found');
		if (updatedSettings instanceof Error) throw updatedSettings;

		return updatedSettings;
	}
}
