import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Put,
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
import { UpdateUserCredentialsDTO } from './dto/update-user-credentials.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticationGuard, RolesGuard)
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
	) {}

	@ApiOperation({ summary: 'Get user data via session cookie' })
	@ApiOkResponse({ description: 'returns user data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getCompleteUserBySession(@Req() req: Request) {
		const userID = req.user.id;
		const user = await this.usersService.getCompleteUserById(userID);
		if (!user) throw new NotFoundException('No user found');

		if (user instanceof Error) {
			return this.responseHelperService.errorResponse('Internal Server Error', 500, 'Query for user failed', user, {
				method: 'GET',
				url: req.url,
			});
		}

		return this.responseHelperService.successResponse(200, 'User found', user, { method: 'GET', url: req.url });
	}

	@ApiOperation({ summary: 'Update user data via session cookie' })
	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.USER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch()
	async updateUserCredentialsBySession(
		@Req() req: Request,
		@Body() body: UpdateUserCredentialsDTO,
	): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const updatedUsers = await this.usersService.updateUserCredentials(userID, body);
		if (!updatedUsers) {
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No user found',
				new NotFoundException('No user found'),
				{ method: 'PATCH', url: req.url },
			);
		}

		if (updatedUsers instanceof Error) {
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'User update failed',
				updatedUsers,
				{ method: 'PATCH', url: req.url },
			);
		}

		return this.responseHelperService.successResponse(200, 'User updated', updatedUsers, {
			method: 'PATCH',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'Delete user data via session cookie' })
	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Delete()
	async deleteUserBySession(@Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const userID = req.user.id;

		const deletedUser = await this.usersService.deleteUser(userID);

		if (!deletedUser) {
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No user found',
				new NotFoundException('No user found'),
				{ method: 'DELETE', url: req.url },
			);
		}

		if (deletedUser instanceof Error) {
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Deleting of User failed',
				deletedUser,
				{ method: 'DELETE', url: req.url },
			);
		}

		req.logout((err) => {
			if (err) throw new Error('Logout failed');
		});

		return this.responseHelperService.successResponse(200, 'User deleted', deletedUser, {
			method: 'DELETE',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get all users data' })
	@ApiOkResponse({ description: 'returns all users data without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no users were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getCompleteUsers(@Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const users = await this.usersService.getAllUsers();

		if (!users) {
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No users found',
				new NotFoundException('No users found'),
				{ method: 'GET', url: '/users/all' },
			);
		}

		if (users instanceof Error) {
			return this.responseHelperService.errorResponse('Internal Server Error', 500, 'Query failed', users, {
				method: 'GET',
				url: req.url,
			});
		}

		return this.responseHelperService.successResponse(200, 'Users found', users, { method: 'GET', url: req.url });
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get user data via userID' })
	@ApiOkResponse({ description: 'returns data from a user without the hashed password' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get(':id')
	async getCompleteUserById(@Param('id') id: string, @Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const user = await this.usersService.getCompleteUserById(id);

		if (!user) {
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No user found',
				new NotFoundException('No user found'),
				{ method: 'GET', url: req.url },
			);
		}

		if (user instanceof Error) {
			return this.responseHelperService.errorResponse('Internal Server Error', 500, 'Query failed', user, {
				method: 'GET',
				url: req.url,
			});
		}

		return this.responseHelperService.successResponse(200, 'User found', user, { method: 'GET', url: req.url });
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update user data via userID' })
	@ApiOkResponse({ description: 'returns userID if user was updated' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user update failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() body: UpdateUserCredentialsDTO,
		@Req() req: Request,
	): Promise<SuccessResponse | ErrorResponse> {
		const updatedUser = await this.usersService.updateUserCredentials(id, body);

		if (!updatedUser) {
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No user found',
				new NotFoundException('No user found'),
				{ method: 'PUT', url: req.url },
			);
		}

		if (updatedUser instanceof Error) {
			return this.responseHelperService.errorResponse('Internal Server Error', 500, 'User update failed', updatedUser, {
				method: 'PUT',
				url: req.url,
			});
		}

		return this.responseHelperService.successResponse(200, 'User updated', updatedUser, {
			method: 'PUT',
			url: req.url,
		});
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Delete user data via userID' })
	@ApiOkResponse({ description: 'returns userID if user was deleted' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie or is not an admin' })
	@ApiNotFoundResponse({ description: 'if no user was found' })
	@ApiInternalServerErrorResponse({ description: 'if user delete failed' })
	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteUser(@Param('id') id: string, @Req() req: Request): Promise<SuccessResponse | ErrorResponse> {
		const deletedUser = await this.usersService.deleteUser(id);

		if (!deletedUser) {
			return this.responseHelperService.errorResponse(
				'Not Found',
				404,
				'No user found',
				new NotFoundException('No user found'),
				{ method: 'DELETE', url: req.url },
			);
		}

		if (deletedUser instanceof Error) {
			return this.responseHelperService.errorResponse(
				'Internal Server Error',
				500,
				'Deleting of User failed',
				deletedUser,
				{ method: 'DELETE', url: req.url },
			);
		}

		return this.responseHelperService.successResponse(200, 'User deleted', deletedUser, {
			method: 'DELETE',
			url: req.url,
		});
	}
}
