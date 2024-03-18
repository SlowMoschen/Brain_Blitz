import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";
import { QuestionService } from "../questions.service";
import { CreateQuestionDTO } from "../dto/create-question.dto";
import { UpdateQuestionDTO } from "../dto/update-question.dto";

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes/questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionService) {}

    @Roles(Role.ADMIN)
    @Post(':quizID')
    @UsePipes(new ValidationPipe())
    async createQuestion(@Body() body: CreateQuestionDTO, @Param('quizID') quizID: string) {
        const createdQuestion = await this.questionService.createQuestion(quizID, body);
        return createdQuestion;
    }

    @Roles(Role.USER, Role.ADMIN)
    @Get(":id")
    async getQuestion(@Param("id") id: string) {
        const question = await this.questionService.getQuestion(id);
        return question;
    }

    @Roles(Role.ADMIN)
    @Patch(":id")
    async updateQuestion(@Param("id") id: string, @Body() body: UpdateQuestionDTO){
        const updatedQuestion = await this.questionService.updateQuestion(id, body);
        return updatedQuestion;
    }

    @Roles(Role.ADMIN)
    @Delete(":id")
    async deleteQuestion(@Param("id") id: string) {
        const deletedQuestion = await this.questionService.deleteQuestion(id);
        return deletedQuestion;
    }
}