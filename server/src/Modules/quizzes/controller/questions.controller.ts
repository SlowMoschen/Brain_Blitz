import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Roles } from "src/Decorators/roles.decorator";
import { Role } from "src/Enums/role.enum";
import { AuthenticationGuard } from "src/Guards/auth.guard";
import { RolesGuard } from "src/Guards/roles.guard";
import { QuestionService } from "../questions.service";
import { CreateQuestionDTO } from "../dto/create-question.dto";
import { UpdateQuestionDTO } from "../dto/update-question.dto";
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('quizzes/questions')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes/questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionService) {}

    @ApiOperation({ summary: 'ADMIN ROUTE - Create a new question' })
    @ApiNotFoundResponse({ description: 'if no quiz was found' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Roles(Role.ADMIN)
    @Post(':quizID')
    @UsePipes(new ValidationPipe())
    async createQuestion(@Body() body: CreateQuestionDTO, @Param('quizID') quizID: string) {
        return await this.questionService.createQuestion(quizID, body);
    }

    @ApiOperation({ summary: 'Get a question by ID' })
    @ApiNotFoundResponse({ description: 'if no question was found' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Roles(Role.USER, Role.ADMIN)
    @Get(":id")
    async getQuestion(@Param("id") id: string) {
        return await this.questionService.getQuestion(id);
    }

    @ApiOperation({ summary: 'ADMIN ROUTE - Update a question' })
    @ApiNotFoundResponse({ description: 'if no question was found' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Roles(Role.ADMIN)
    @Patch(":id")
    async updateQuestion(@Param("id") id: string, @Body() body: UpdateQuestionDTO){
        return await this.questionService.updateQuestion(id, body);
    }

    @ApiOperation({ summary: 'ADMIN ROUTE - Delete a question' })
    @ApiNotFoundResponse({ description: 'if no question was found' })
    @ApiForbiddenResponse({ description: 'if user got no session cookie' })
    @ApiInternalServerErrorResponse({ description: 'if query failed' })
    @Roles(Role.ADMIN)
    @Delete(":id")
    async deleteQuestion(@Param("id") id: string) {
        return await this.questionService.deleteQuestion(id);
    }
}