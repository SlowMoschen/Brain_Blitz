import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	Param,
	Patch,
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
import { User } from 'src/Decorators/user.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UpdateUserSettingsDTO } from '../dto/update-user-settings.dto';
import { UsersService } from '../users.service';

@ApiTags('users/settings')
@Controller('users/settings')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersSettingsController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Get user settings via session cookie' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getUserSettingsBySession(@User('id') id: string) {
		return await this.usersService.getSettings(id);
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
		@User('id') id: string,
		@User('roles') roles: string[],
		@Body() body: UpdateUserSettingsDTO,
	) {
		if (roles[0] === Role.USER && body.roles) throw new ForbiddenException('Keine Berechtigung für diese Aktion');
		return await this.usersService.updateSettings(id, body);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user settings by ID' })
	@ApiOkResponse({ description: 'returns user settings table' })
	@ApiNotFoundResponse({ description: 'if no settings were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getUserSettingsById(id: string) {
		return await this.usersService.getSettings(id);
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
		return await this.usersService.updateSettings(userID, body);
	}
}
