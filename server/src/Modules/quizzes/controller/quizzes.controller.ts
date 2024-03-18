import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/Decorators/roles.decorator';
import { User } from 'src/Decorators/user.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { QuizService } from '../quizzes.service';
import { CreateQuizDTO } from '../dto/create-quiz.dto';
import { CompletedQuizDTO } from '../dto/completed-quiz.dto';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes')
export class QuizzesController {
	constructor(private readonly quizService: QuizService) {}

	@Roles(Role.ADMIN)
	@Get()
	async getAllQuizzes() {
		const quizzes = await this.quizService.getAllQuizzes();
		if (quizzes instanceof Error) return quizzes;
		return quizzes;
	}

	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Post()
	async createQuiz(@Body() quiz: CreateQuizDTO) {
		const createdQuiz = await this.quizService.createQuiz(quiz);
		if (createdQuiz instanceof Error) return createdQuiz;
		return createdQuiz;
	}

	@Roles(Role.USER, Role.ADMIN)
	@Post('complete/:id')
	@UsePipes(new ValidationPipe())
	async completeQuiz(
		@Body() completedQuizDTO: CompletedQuizDTO,
		@Param('id') quizId: string,
		@User('id') userId: string,
	) {
		const completedQuiz = await this.quizService.completeQuiz(quizId, userId, completedQuizDTO);
		if (completedQuiz instanceof Error) return completedQuiz;
		return completedQuiz;
	}

	@Roles(Role.USER, Role.ADMIN)
	@Get(':id')
	async getQuiz(@Param('id') quizID: string) {
		const quiz = await this.quizService.getQuiz(quizID);
		if (quiz instanceof Error) return quiz;
		return quiz;
	}

	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateQuiz(@Param('id') quizID: string, @Body() quiz: CreateQuizDTO) {
		const updatedQuiz = await this.quizService.updateQuiz(quizID, quiz);
		if (updatedQuiz instanceof Error) return updatedQuiz;
		return updatedQuiz;
	}

	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteQuiz(@Param('id') quizID: string) {
		const deletedQuiz = await this.quizService.deleteQuiz(quizID);
		if (deletedQuiz instanceof Error) return deletedQuiz;
		return deletedQuiz;
	}

	@Roles(Role.USER, Role.ADMIN)
	@Get(':category')
	async getQuizzesByCategory(@Param('category') category: string) {
		const quizzes = await this.quizService.getQuizzesByCategory(category);
		if (quizzes instanceof Error) return quizzes;
		return quizzes;
	}
}
