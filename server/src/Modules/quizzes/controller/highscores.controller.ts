import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes/highscores')
export class HighscoresController {
    constructor() {}

    @Roles(Role.USER, Role.ADMIN)
    @Get("")
    async getHighScores() {
        return "High scores";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get("user")
    async getHighScoresByUser() {
        return "High scores by user";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":quizId")
    async getHighScoresByQuiz() {
        return "High scores by quiz";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Post(":quizId")
    async createHighScore() {
        return "Create high score";
    }
}