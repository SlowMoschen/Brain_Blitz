import { Body, Controller, Get, Inject, NotFoundException, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { ModifiedRequest } from "src/Utils/Types/request.types";
import { UsersSettingsService } from "../shared/user/user.settings.service";
import { UpdateUserSettingsDTO } from "./dto/update-user-settings.dto";

@Controller('users/settings')
export class UsersSettingsController {
    constructor(@Inject(UsersSettingsService) private readonly userSettingService: UsersSettingsService) {}

    @Get()
    @UseGuards(AuthenticationGuard)
    async getUserSettings() {
        const settings = await this.userSettingService.getUserSettings();
        if (!settings) throw new NotFoundException('No settings found');
        return { data: settings, message: 'Settings found' };
    }

    @Get('setting')
    @UseGuards(AuthenticationGuard)
    async getUserSettingsBySession(@Req() req: ModifiedRequest) {
        const userID = req.user.id;
        const settings = await this.userSettingService.getUserSettingsById(userID);
        if (!settings) throw new NotFoundException('No settings found');
        return { data: settings, message: 'Settings found' };
    }

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async getUserSettingsById(id: string) {
        const settings = await this.userSettingService.getUserSettingsById(id);
        if (!settings) throw new NotFoundException('No settings found');
        return { data: settings, message: 'Settings found' };
    }

    @Patch(':id')
    @UseGuards(AuthenticationGuard)
    async updateUserSettings(@Param('id') userID: string, @Body() body: UpdateUserSettingsDTO){
        const settings = await this.userSettingService.updateUserSettings(userID, body);
        if (!settings) throw new NotFoundException('No settings found');
        return { data: settings, message: 'Settings updated' };
    }

    @Patch('setting')
    @UseGuards(AuthenticationGuard)
    async updateUserSettingsBySession(@Req() req: ModifiedRequest, @Body() body: UpdateUserSettingsDTO){
        const userID = req.user.id;
        const settings = await this.userSettingService.updateUserSettings(userID, body);
        if (!settings) throw new NotFoundException('No settings found');
        return { data: settings, message: 'Settings updated' };
    }

}