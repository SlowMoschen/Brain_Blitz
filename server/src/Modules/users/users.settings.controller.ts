import {
	Body,
	Controller,
	Get,
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
import { ModifiedRequest } from 'src/Utils/Types/request.types';
import { UsersSettingsService } from '../shared/user/user.settings.service';
import { UpdateUserSettingsDTO } from './dto/update-user-settings.dto';
import { RolesGuard } from 'src/Guards/roles.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { Role } from 'src/Enums/role.enum';

@Controller('users/settings')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersSettingsController {
	constructor(@Inject(UsersSettingsService) private readonly userSettingService: UsersSettingsService) {}

	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserSettingsBySession(@Req() req: ModifiedRequest) {
		const userID = req.user.id;
		const settings = await this.userSettingService.getUserSettingsById(userID);
		if (!settings) throw new NotFoundException('No settings found');
		return { data: settings, message: 'Settings found' };
	}

	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch()
	async updateUserSettingsBySession(@Req() req: ModifiedRequest, @Body() body: UpdateUserSettingsDTO) {
		const userID = req.user.id;
		const settings = await this.userSettingService.updateUserSettings(userID, body);
		if (!settings) throw new NotFoundException('No settings found');
		return { data: settings, message: 'Settings updated' };
	}

	@Roles(Role.ADMIN)
	@Get('all')
	async getUserSettings() {
		const settings = await this.userSettingService.getUserSettings();
		if (!settings) throw new NotFoundException('No settings found');
		return { data: settings, message: 'Settings found' };
	}

	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserSettingsById(id: string) {
		const settings = await this.userSettingService.getUserSettingsById(id);
		if (!settings) throw new NotFoundException('No settings found');
		return { data: settings, message: 'Settings found' };
	}

	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateUserSettings(@Param('id') userID: string, @Body() body: UpdateUserSettingsDTO) {
		const settings = await this.userSettingService.updateUserSettings(userID, body);
		if (!settings) throw new NotFoundException('No settings found');
		return { data: settings, message: 'Settings updated' };
	}
}
