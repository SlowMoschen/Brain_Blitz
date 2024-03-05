import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './users.controller';
import { UsersSettingsController } from './users.settings.controller';

@Module({
  imports: [SharedModule],
  controllers: [UsersSettingsController, UsersController]
})
export class UsersModule {}
