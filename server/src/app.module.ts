import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Modules/auth/auth.module';
import { QuizzesModule } from './Modules/quizzes/quizzes.module';
import { SharedModule } from './Modules/shared/shared.module';
import { UsersModule } from './Modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    AuthModule,
    UsersModule,
    QuizzesModule,
  ],
})
export class AppModule {}
