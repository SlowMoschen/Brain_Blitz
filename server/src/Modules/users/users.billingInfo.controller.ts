import { Body, Controller, Get, HttpException, Inject, NotFoundException, Param, Patch, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { ReqWithUser } from 'src/Utils/Types/request.types';
import { BillingInfoService } from '../shared/user/user.billingInfo.service';
import { UpdateUserBillingInfoDTO } from './dto/update-user-billingInfo.dto';

@ApiTags('users/billing-info')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/billing-info')
export class UsersBillingInfoController {
	constructor(@Inject(BillingInfoService) private readonly billingInfoService: BillingInfoService) {}

	@ApiOperation({ summary: 'Get user billing info via session cookie' })
	@ApiOkResponse({ description: 'returns user billing info' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getBillingInfoBySession(@Req() req: ReqWithUser) {
		const userID = req.user.id;

		const billingInfo = await this.billingInfoService.getBillingInfoById(userID);
		if (!billingInfo) return new NotFoundException('No billing info found');
		if (billingInfo instanceof Error) return new HttpException('Query failed', 500);

		return { data: billingInfo, message: 'Billing info found' };
	}

    @ApiOperation({ summary: 'Update user billing info via session cookie' })
    @ApiOkResponse({ description: 'returns userID of updated billing info table' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie' })
    @ApiNotFoundResponse({ description: 'if no billing info was found' })
    @ApiInternalServerErrorResponse({ description: 'if updating billing info failed' })
    @UsePipes(new ValidationPipe())
	@Roles(Role.USER, Role.ADMIN)
	@Patch()
	async updateBillingInfoBySession(@Req() req: ReqWithUser, @Body() updateBillingInfoDTO: UpdateUserBillingInfoDTO) {
		const userID = req.user.id;

		const billingInfo = await this.billingInfoService.updateBillingInfo(userID, updateBillingInfoDTO);
		if (!billingInfo) return new NotFoundException('No billing info found');
		if (billingInfo instanceof Error) return new HttpException('Updating billing infomartion failed', 500);

		return { data: billingInfo, message: 'Billing info updated' };
	}

    @ApiOperation({ summary: 'ADMIN ROUTE - Get all billing info' })
    @ApiOkResponse({ description: 'returns all billing info' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
    @ApiNotFoundResponse({ description: 'if no billing info was found' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getAllBillingInfo() {
        const billingInfos = await this.billingInfoService.getAllBillingInfos();
        if (!billingInfos) return new NotFoundException('No billing infos found');
        if (billingInfos instanceof Error) return new HttpException('Query failed', 500);

        return { data: billingInfos, message: 'Billing infos found' };
	}

    @ApiOperation({ summary: 'ADMIN ROUTE - Get billing info by id' })
    @ApiOkResponse({ description: 'returns billing info' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
    @ApiNotFoundResponse({ description: 'if no billing info was found' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getBillingInfoById(@Param() id: string) {
		const billingInfo = await this.billingInfoService.getBillingInfoById(id);
        if (!billingInfo) return new NotFoundException('No billing info found');
        if (billingInfo instanceof Error) return new HttpException('Query failed', 500);

        return { data: billingInfo, message: 'Billing info found' };
	}

    @ApiOperation({ summary: 'ADMIN ROUTE - Update billing info by id' })
    @ApiOkResponse({ description: 'returns userID of updated billing info table' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
    @ApiNotFoundResponse({ description: 'if no billing info was found' })
    @ApiInternalServerErrorResponse({ description: 'if updating billing info failed' })
    @UsePipes(new ValidationPipe())
	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateBillingInfoById(@Param() id: string, @Body() updateBillingInfoDTO: UpdateUserBillingInfoDTO) {
        const billingInfo = await this.billingInfoService.updateBillingInfo(id, updateBillingInfoDTO);
        if (!billingInfo) return new NotFoundException('No billing info found');
        if (billingInfo instanceof Error) return new HttpException('Updating billing infomartion failed', 500);

        return { data: billingInfo, message: 'Billing info updated' };
	}
}
