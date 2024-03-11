import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { DB_CONNECTION } from 'src/Utils/constants';
import { UserRepository } from './Repositories/User/_user.repository';
import { TokenRepository } from './Repositories/Token/token.repository';
import { BillingInfoRepository } from './Repositories/User/billingInfo.repository';
import { SettingsRepository } from './Repositories/User/settings.repository';
import { StatisticsRepository } from './Repositories/User/statistics.repository';
import { TimestampsRepository } from './Repositories/User/timestamps.repository';

@Module({
	imports: [],
	providers: [
		databaseProvider,
		UserRepository,
		TokenRepository,
		BillingInfoRepository,
		SettingsRepository,
		StatisticsRepository,
		TimestampsRepository,
	],
	exports: [DB_CONNECTION, UserRepository, databaseProvider, TokenRepository],
})
export class DatabaseModule {}
