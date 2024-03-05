import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('users/statistics')
export class UsersStatisticsController {
    constructor() {}
    
    @Roles(Role.USER, Role.ADMIN)
    @Get()
    async getUserStatisticsBySession() {
        return { data: 'User statistics', message: 'Statistics found' };
    }
    
    @Roles(Role.USER, Role.ADMIN)
    @Patch()
    async updateUserStatisticsBySession() {
        return { data: 'User statistics', message: 'Statistics updated' };
    }

    @Roles(Role.ADMIN)
    @Get('all')
    async getUserStatistics() {
        return { data: 'User statistics', message: 'Statistics found' };
    }
    
    @Roles(Role.ADMIN)
    @Get(':id')
    async getUserStatisticsById() {
        return { data: 'User statistics', message: 'Statistics found' };
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    async updateUserStatistics() {
        return { data: 'User statistics', message: 'Statistics updated' };
    }
}