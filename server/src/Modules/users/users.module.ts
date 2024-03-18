import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './controller/users.controller';
import { UsersSettingsController } from './controller/users.settings.controller';
import { UsersStatisticsController } from './controller/users.statistics.controller';
import { UsersBillingInfoController } from './controller/users.billingInfo.controller';
import { UsersService } from './users.service';

@Module({
	imports: [SharedModule],
	providers: [UsersService],
	controllers: [UsersBillingInfoController, UsersStatisticsController, UsersSettingsController, UsersController],
	exports: [UsersService],
})
export class UsersModule {}
