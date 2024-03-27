import { Controller, Get } from "@nestjs/common";
import { QuizService } from "./Modules/quizzes/quizzes.service";

@Controller()
export class AppController {
    constructor(private readonly quizService: QuizService) {}

    @Get()
    healthCheck(): string {
        return 'Server is up and running!'
    }

    @Get('about/stats')
    async getStats() {
        return await this.quizService.getStats();
    }
}