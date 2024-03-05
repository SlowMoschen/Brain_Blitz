import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './users.controller';
import { RolesGuard } from 'src/Guards/roles.guard';

@Module({
  providers: [
    {
      provide: "APP_GUARD",
      useClass: RolesGuard
    }
  ],
  imports: [SharedModule],
  controllers: [UsersController]
})
export class UsersModule {}
