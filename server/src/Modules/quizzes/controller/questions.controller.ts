import { Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";
import { QuestionService } from "../questions.service";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes/questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionService) {}

    @Roles(Role.ADMIN)
    @Post("questions")
    async createQuestion() {
        return "Create question";
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":id")
    async getQuestion() {
        return "Get question";
    }

    @Roles(Role.ADMIN)
    @Patch(":id")
    async updateQuestion() {
        return "Update question";
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    async deleteQuestion() {
        return "Delete question";
    }
}