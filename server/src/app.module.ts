import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './Modules/shared/shared.module';
import { AuthModule } from './Modules/auth/auth.module';
import { UsersModule } from './Modules/users/users.module';
import { QuizzesModule } from './Modules/quizzes/quizzes.module';
import { HighscoresModule } from './Modules/highscores/highscores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    AuthModule,
    UsersModule,
    QuizzesModule,
    HighscoresModule,
  ],
})
export class AppModule {}
