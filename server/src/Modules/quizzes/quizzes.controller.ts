import { Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller("quizzes")
export class QuizzesController {
    constructor() {}

    @Roles(Role.ADMIN)
    @Get()
    async getAllQuizzes() {
        return "All Quizzes";
    }

    @Roles(Role.ADMIN)
    @Post()
    async createQuiz() {
        return "Quiz created";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":id")
    async getQuiz() {
        return "Get Quiz";
    }

    @Roles(Role.ADMIN)
    @Patch(":id")
    async updateQuiz() {
        return "Update Quiz";
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    async deleteQuiz() {
        return "Delete Quiz";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Patch("complete/:id")
    async completeQuiz() {
        return "Complete Quiz";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":category")
    async getQuizzesByCategory() {
        return "Quizzes by category";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":category/:id")
    async getQuizByCategory() {
        return "Quiz by category";
    }

    @Roles(Role.ADMIN)
    @Post("questions")
    async createQuestion() {
        return "Create question";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get("questions/:id")
    async getQuestion() {
        return "Get question";
    }

    @Roles(Role.ADMIN)
    @Patch("questions/:id")
    async updateQuestion() {
        return "Update question";
    }

    @Roles(Role.ADMIN)
    @Delete("questions/:id")
    async deleteQuestion() {
        return "Delete question";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get("highscores")
    async getHighScores() {
        return "High scores";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get("highscores/user")
    async getHighScoresByUser() {
        return "High scores by user";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get("highscores/:quizId")
    async getHighScoresByQuiz() {
        return "High scores by quiz";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Post("highscores/:quizId")
    async createHighScore() {
        return "Create high score";
    }
}