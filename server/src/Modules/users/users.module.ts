import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './users.controller';
import { RolesGuard } from 'src/Guards/roles.guard';
import { UsersSettingsController } from './users.settings.controller';

@Module({
  imports: [SharedModule],
  controllers: [UsersController, UsersSettingsController]
})
export class UsersModule {}
