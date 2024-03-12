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
import { ErrorResponse, SuccessResponse } from 'src/Utils/Types/response.types';
import { ResponseHelperService } from '../shared/responseHelper.service';
import { UpdateUserBillingInfoDTO } from './dto/update-user-billingInfo.dto';
import { UsersService } from './users.service';

@ApiTags('users/billing-info')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/billing-info')
export class UsersBillingInfoController {
	constructor(
		private readonly usersService: UsersService,
		private readonly responseHelperSerive: ResponseHelperService,
	) {}

	@ApiOperation({ summary: 'Get user billing info via session cookie' })
	@ApiOkResponse({ description: 'returns user billing info' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getBillingInfoBySession(@Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const billingInfo = await this.usersService.getBillingInfo(userID);

		if (!billingInfo) {
			return this.responseHelperSerive.errorResponse(
				'Not Found',
				404,
				'No billing info found',
				new NotFoundException('No billing info found'),
				{ method: 'GET', url: req.url },
			);
		}

		if (billingInfo instanceof Error) {
			return this.responseHelperSerive.errorResponse(
				'Internal Server Error',
				500,
				'Query failed',
				new HttpException('Query failed', 500),
				{ method: 'GET', url: req.url },
			);
		}

		return this.responseHelperSerive.successResponse(200, 'Billing info found', billingInfo, {
			method: 'GET',
			url: req.url,
		});
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
		@Req() req: Request,
		@Body() updateBillingInfoDTO: UpdateUserBillingInfoDTO,
	): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const updatedBillingInfo = await this.usersService.updateBillingInfo(userID, updateBillingInfoDTO);

		if (!updatedBillingInfo) {
			return this.responseHelperSerive.errorResponse(
				'Not Found',
				404,
				'No billing info found',
				new NotFoundException('No billing info found'),
				{ method: 'PATCH', url: req.url },
			);
		}

		if (updatedBillingInfo instanceof Error) {
			return this.responseHelperSerive.errorResponse(
				'Internal Server Error',
				500,
				'Updating billing infomartion failed',
				new HttpException('Updating billing infomartion failed', 500),
				{ method: 'PATCH', url: req.url },
			);
		}

		return this.responseHelperSerive.successResponse(200, 'Billing info updated', updatedBillingInfo, {
			method: 'PATCH',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get billing info by id' })
	@ApiOkResponse({ description: 'returns billing info' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no billing info was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getBillingInfoById(@Param() id: string, @Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const billingInfo = await this.usersService.getBillingInfo(id);

		if (!billingInfo) {
			return this.responseHelperSerive.errorResponse(
				'Not Found',
				404,
				'No billing info found',
				new NotFoundException('No billing info found'),
				{ method: 'GET', url: req.url },
			);
		}

		if (billingInfo instanceof Error) {
			return this.responseHelperSerive.errorResponse(
				'Internal Server Error',
				500,
				'Query failed',
				new HttpException('Query failed', 500),
				{ method: 'GET', url: req.url },
			);
		}

		return this.responseHelperSerive.successResponse(200, 'Billing info found', billingInfo, {
			method: 'GET',
			url: req.url,
		});
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
		@Req() req: Request,
	): Promise<SuccessResponse | ErrorResponse> {
		const updatedBillingInfo = await this.usersService.updateBillingInfo(id, updateBillingInfoDTO);

		if (!updatedBillingInfo) {
			return this.responseHelperSerive.errorResponse(
				'Not Found',
				404,
				'No billing info found',
				new NotFoundException('No billing info found'),
				{ method: 'PATCH', url: req.url },
			);
		}

		if (updatedBillingInfo instanceof Error) {
			return this.responseHelperSerive.errorResponse(
				'Internal Server Error',
				500,
				'Updating billing infomartion failed',
				new HttpException('Updating billing infomartion failed', 500),
				{ method: 'PATCH', url: req.url },
			);
		}

		return this.responseHelperSerive.successResponse(200, 'Billing info updated', updatedBillingInfo, {
			method: 'PATCH',
			url: req.url,
		});
	}
}
