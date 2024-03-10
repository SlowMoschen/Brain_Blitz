import { Module } from '@nestjs/common';
import { databaseProvider } from './database/database';
import { DB_CONNECTION } from 'src/Utils/constants';
import { UserService } from './user/user.service';
import { EncryptionService } from './encryption/encryption.service';
import { SettingsService } from './user/user.settings.service';
import { AccessControlService } from './access-control/access-control.service';
import { StatisticsService } from './user/user.statistics.service';
import { TimestampsService } from './user/user.timestamps.service';
import { BillingInfoService } from './user/user.billingInfo.service';
import { TokenModule } from './token/token.module';

@Module({
	imports: [TokenModule],
	providers: [
		databaseProvider,
		UserService,
		EncryptionService,
		SettingsService,
		AccessControlService,
		StatisticsService,
		TimestampsService,
		BillingInfoService,
	],
	exports: [
		DB_CONNECTION,
		UserService,
		EncryptionService,
		SettingsService,
		AccessControlService,
		StatisticsService,
		TimestampsService,
		BillingInfoService,
	],
})
export class SharedModule {}
