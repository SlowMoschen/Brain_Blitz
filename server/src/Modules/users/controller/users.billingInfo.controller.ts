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
import { UpdateUserBillingInfoDTO } from '../dto/update-user-billingInfo.dto';
import { UsersService } from '../users.service';
import { User } from 'src/Decorators/user.decorator';

@ApiTags('users/billing-info')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/billing-info')
export class UsersBillingInfoController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: 'Get user billing info via session cookie' })
	@ApiOkResponse({ description: 'returns user billing info' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getBillingInfoBySession(@User('id') id: string) {
		return await this.usersService.getBillingInfo(id);
	}

	@ApiOperation({ summary: 'Update user billing info via session cookie' })
	@ApiOkResponse({ description: 'returns userID of updated billing info table' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if updating billing info failed' })
	@UsePipes(new ValidationPipe())
	@Roles(Role.USER, Role.ADMIN)
	@Patch()
	async updateBillingInfoBySession(
		@User('id') id: string,
		@Body() updateBillingInfoDTO: UpdateUserBillingInfoDTO,
	) {
		return await this.usersService.updateBillingInfo(id, updateBillingInfoDTO);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get billing info by id' })
	@ApiOkResponse({ description: 'returns billing info' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getBillingInfoById(@Param() id: string) {
		return await this.usersService.getBillingInfo(id);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update billing info by id' })
	@ApiOkResponse({ description: 'returns userID of updated billing info table' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if updating billing info failed' })
	@UsePipes(new ValidationPipe())
	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateBillingInfoById(
		@Param() id: string,
		@Body() updateBillingInfoDTO: UpdateUserBillingInfoDTO,
	) {
		return await this.usersService.updateBillingInfo(id, updateBillingInfoDTO);
	}
}
