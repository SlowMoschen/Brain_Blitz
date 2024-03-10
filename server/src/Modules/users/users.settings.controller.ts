import {
	Body,
	Controller,
	Get,
	HttpException,
	Inject,
	NotFoundException,
	Param,
	Patch,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { SettingsService } from '../shared/user/user.settings.service';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';
import {
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

@ApiTags('users/settings')
@Controller('users/settings')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersSettingsController {
	constructor(@Inject(SettingsService) private readonly userSettingService: SettingsService) {}

	@ApiOperation({ summary: 'Get user settings via session cookie' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserSettingsBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;

		const settings = await this.userSettingService.getUserSettingsById(userID);
		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw new HttpException('Query for settings failed', 500);

		return { data: settings, message: 'Settings found' };
	}

	@ApiOperation({ summary: 'Update user settings via session cookie' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch()
	async updateUserSettingsBySession(@Req() req: ReqWithUser, @Body() body: UpdateUserSettingsDTO) {
		const userID = req.user.id;

		const settings = await this.userSettingService.updateUserSettings(userID, body);
		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw new HttpException('Query for settings failed', 500);

		return { data: settings, message: 'Settings updated' };
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user settings by ID' })
	@ApiOkResponse({ description: 'returns all user settings' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getUserSettings() {
		const settings = await this.userSettingService.getUserSettings();
		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw new HttpException('Query for settings failed', 500);

		return { data: settings, message: 'Settings found' };
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user settings by ID' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserSettingsById(id: string) {
		const settings = await this.userSettingService.getUserSettingsById(id);
		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw new HttpException('Query for settings failed', 500);

		return { data: settings, message: 'Settings found' };
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user settings by ID' })
	@ApiOkResponse({ description: 'returns userID if table was updated successfully' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateUserSettings(@Param('id') userID: string, @Body() body: UpdateUserSettingsDTO) {
		const settings = await this.userSettingService.updateUserSettings(userID, body);
		if (!settings) throw new NotFoundException('No settings found');
		if (settings instanceof Error) throw new HttpException('Update of settings failed', 500);
		return { data: settings, message: 'Settings updated' };
	}
}
