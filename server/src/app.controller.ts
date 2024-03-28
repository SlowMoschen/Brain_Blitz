import { Controller, Get } from "@nestjs/common";
import { QuizService } from "./Modules/quizzes/quizzes.service";
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle()
@Controller()
export class AppController {
    constructor(private readonly quizService: QuizService) {}

    @Get()
    healthCheck(): string {
        return 'Server is up and running!'
    }

    @Get('quiz-data')
    async getStats() {
        return await this.quizService.getStats();
    }
}