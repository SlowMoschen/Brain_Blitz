import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import {
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/Decorators/roles.decorator';
import { User } from 'src/Decorators/user.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { CompletedQuizDTO } from '../dto/completed-quiz.dto';
import { CreateQuizDTO } from '../dto/create-quiz.dto';
import { UpdateQuizDTO } from '../dto/update-quiz.dto';
import { QuizService } from '../quizzes.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { QuizStartedEvent } from 'src/Events/quiz.events';

@ApiTags('quizzes')
@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes')
export class QuizzesController {
	constructor(
		private readonly quizService: QuizService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@ApiOperation({ summary: 'Get all quizzes by category' })
	@ApiOkResponse({ description: 'returns all quizzes' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no quizzes were found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get()
	async getQuizzesByCategory(@Query('category') category: string) {
		return await this.quizService.getQuizzesByCategory(category);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Get all quizzes' })
	@ApiOkResponse({ description: 'returns all quizzes' })
	@ApiNotFoundResponse({ description: 'if no quizzes were found' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Get('all')
	async getAllQuizzes() {
		return await this.quizService.getAllQuizzes();
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Create a new quiz' })
	@ApiOkResponse({ description: 'returns the created quiz' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Post()
	async createQuiz(@Body() quiz: CreateQuizDTO) {
		return await this.quizService.createQuiz(quiz);
	}

	@ApiOperation({ summary: 'If score threshhold is surpassed - completes Quiz and unlocks new one - saves highscore ' })
	@ApiOkResponse({ description: 'returns the completed quiz' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Post('complete/:id')
	@UsePipes(new ValidationPipe())
	async completeQuiz(
		@Body() completedQuizDTO: CompletedQuizDTO,
		@Param('id') quizId: string,
		@User('id') userId: string,
	) {
		return await this.quizService.completeQuiz(quizId, userId, completedQuizDTO);
	}

	@ApiOperation({ summary: 'Get quiz by id and send an event to reduce energy level' })
	@ApiOkResponse({ description: 'returns the quiz' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no quiz was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get('start/:id')
	async startQuiz(@Param('id') quizID: string, @User('id') userId: string) {
		this.eventEmitter.emit('quiz.started', new QuizStartedEvent(userId, quizID));
		return await this.quizService.getQuiz(quizID);
	}

	@ApiOperation({ summary: 'Get a quiz by ID' })
	@ApiOkResponse({ description: 'returns the quiz' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no quiz was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.USER, Role.ADMIN)
	@Get(':id')
	async getQuiz(@Param('id') quizID: string) {
		return await this.quizService.getQuiz(quizID);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Update a quiz by ID' })
	@ApiOkResponse({ description: 'returns the updated quiz' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no quiz was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateQuiz(@Param('id') quizID: string, @Body() quiz: UpdateQuizDTO) {
		return await this.quizService.updateQuiz(quizID, quiz);
	}

	@ApiOperation({ summary: 'ADMIN ROUTE - Delete a quiz by ID' })
	@ApiOkResponse({ description: 'returns the deleted quiz' })
	@ApiForbiddenResponse({ description: 'if user got no session cookie' })
	@ApiNotFoundResponse({ description: 'if no quiz was found' })
	@ApiInternalServerErrorResponse({ description: 'if query failed' })
	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteQuiz(@Param('id') quizID: string) {
		return await this.quizService.deleteQuiz(quizID);
	}
}
