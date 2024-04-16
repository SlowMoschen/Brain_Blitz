import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { QuizzesModule } from '../quizzes/quizzes.module';

@Module({
	imports: [UsersModule, QuizzesModule],
	controllers: [RankingsController],
	providers: [RankingsService],
	exports: [],
})
export class RankingsModule {}
