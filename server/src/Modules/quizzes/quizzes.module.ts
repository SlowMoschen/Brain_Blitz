import { Module } from '@nestjs/common';
import { GameModule } from '../game/game.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { QuestionsController } from './controller/questions.controller';
import { QuizzesController } from './controller/quizzes.controller';
import { HighscoreService } from './highscore.service';
import { QuestionService } from './questions.service';
import { QuizService } from './quizzes.service';

@Module({
	imports: [UsersModule, SharedModule, GameModule],
	controllers: [QuestionsController, QuizzesController],
	providers: [QuizService, QuestionService, HighscoreService],
	exports: [HighscoreService, QuizService, QuestionService],
})
export class QuizzesModule {}
