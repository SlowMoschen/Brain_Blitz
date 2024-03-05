import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './Modules/shared/shared.module';
import { AuthModule } from './Modules/auth/auth.module';
import { UsersModule } from './Modules/users/users.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
