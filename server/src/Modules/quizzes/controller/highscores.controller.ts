import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { User } from "src/Decorators/user.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";
import { HighscoreService } from "../highscore.service";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes/highscores')
export class HighscoresController {
    constructor(private readonly highscoreService: HighscoreService) {}

    @Roles(Role.USER, Role.ADMIN)
    @Get("")
    async getHighScoresByUser(@User('id') userId: string) {
        const highScores = await this.highscoreService.getHighscoresByUser(userId);
        return highScores;
    }

    @Roles(Role.ADMIN)
    @Get("all")
    async getAllHighScores() {
        const highScores = await this.highscoreService.getHighscores();
        return highScores;
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":quizId")
    async getHighScoresByQuiz(@Param('id') quizId: string) {
        const highScores = await this.highscoreService.getHighscoresByQuiz(quizId);
        return highScores;
    }
}