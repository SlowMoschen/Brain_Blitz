import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { QuizzesController } from "./quizzes.controller";
import { QuizzesService } from "./quizzes.service";

@Module({
    imports: [SharedModule],
    controllers: [QuizzesController],
    providers: [QuizzesService],
    exports: []
})
export class QuizzesModule {}