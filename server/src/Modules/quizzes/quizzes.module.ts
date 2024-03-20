import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { QuizzesController } from './controller/quizzes.controller';
import { QuizService } from './quizzes.service';
import { HighscoresController } from './controller/highscores.controller';
import { QuestionsController } from './controller/questions.controller';
import { QuestionService } from './questions.service';
import { HighscoreService } from './highscore.service';
import { GameModule } from '../game/game.module';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [UsersModule, SharedModule, GameModule],
	controllers: [QuestionsController, HighscoresController, QuizzesController],
	providers: [QuizService, QuestionService, HighscoreService],
	exports: [HighscoreService, QuizService, QuestionService],
})
export class QuizzesModule {}
