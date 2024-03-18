import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { QuizzesController } from "./controller/quizzes.controller";
import { QuizzesService } from "./quizzes.service";
import { HighscoresController } from "./controller/highscores.controller";
import { QuestionsController } from "./controller/questions.controller";

@Module({
    imports: [SharedModule],
    controllers: [QuestionsController, HighscoresController, QuizzesController],
    providers: [QuizzesService],
    exports: []
})
export class QuizzesModule {}