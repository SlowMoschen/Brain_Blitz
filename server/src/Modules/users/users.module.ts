import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './users.controller';
import { UsersSettingsController } from './users.settings.controller';
import { UsersStatisticsController } from './users.statistics.controller';

@Module({
  imports: [SharedModule],
  controllers: [UsersStatisticsController, UsersSettingsController, UsersController]
})
export class UsersModule {}
