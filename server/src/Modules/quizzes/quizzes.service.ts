import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CompleteQuizEvent } from 'src/Events/quiz.events';
import { CompletedQuiz } from 'src/Utils/Types/completedQuiz.types';
import { SelectQuiz } from 'src/Utils/Types/model.types';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { CompletedQuizDTO } from './dto/completed-quiz.dto';
import { CreateQuizDTO } from './dto/create-quiz.dto';
import { UpdateQuizDTO } from './dto/update-quiz.dto';
import { HighscoreService } from './highscore.service';

@Injectable()
export class QuizService {
	constructor(
		private readonly quizRepository: QuizRepository,
		private readonly eventEmitter: EventEmitter2,
		private readonly highscoreService: HighscoreService,
	) {}

	async getAllQuizzes(): Promise<SelectQuiz[] | Error> {
		const quizzes = await this.quizRepository.findAll();
		if (quizzes instanceof Error) return quizzes;
		if (quizzes.length === 0) return new NotFoundException('No quizzes found');
		return quizzes;
	}

	async getQuiz(id: string): Promise<SelectQuiz | Error> {
		const quiz = await this.quizRepository.findOne(id);
		if (quiz instanceof Error) return quiz;
		if (!quiz) return new NotFoundException('Quiz not found');
		return quiz;
	}

	async createQuiz(quiz: CreateQuizDTO): Promise<string | Error> {
		const createdQuiz = await this.quizRepository.insertOne(quiz);
		if (createdQuiz instanceof Error) return createdQuiz;
		if (!createdQuiz) return new HttpException('Failed to create quiz', 500);
		return createdQuiz;
	}

	async updateQuiz(id: string, quiz: UpdateQuizDTO): Promise<string | Error> {
		const updatedQuiz = await this.quizRepository.updateOne(id, quiz);
		if (updatedQuiz instanceof Error) return updatedQuiz;
		if (!updatedQuiz) return new NotFoundException('Quiz not found');
		return updatedQuiz;
	}

	async deleteQuiz(id: string): Promise<string | Error> {
		const deletedQuiz = await this.quizRepository.deleteOne(id);
		if (deletedQuiz instanceof Error) return deletedQuiz;
		return deletedQuiz;
	}

	async getQuizzesByCategory(category: string): Promise<SelectQuiz[] | Error> {
		const quizzes = await this.quizRepository.findByCategory(category);
		if (quizzes instanceof Error) return quizzes;
		if (quizzes.length === 0) return new NotFoundException('No quizzes found');
		return quizzes;
	}

	async completeQuiz(
		quizId: string,
		userId: string,
		completedQuizDTO: CompletedQuizDTO,
	): Promise<CompletedQuiz | Error> {
        const returnValue: CompletedQuiz = {
            completed: false,
            newQuiz: null,
            highscore: null,
        };
		if (completedQuizDTO.score >= parseInt(process.env.QUIZ_UNLOCK_THRESHOLD)) {
			const [completedQuiz, unlockedQuiz] = await this.eventEmitter.emitAsync(
				'quiz.completed',
				new CompleteQuizEvent(userId, quizId, completedQuizDTO.score),
			);
			if (typeof completedQuiz === 'string') returnValue.completed = true;
			if (typeof unlockedQuiz === 'string') returnValue.newQuiz = unlockedQuiz;
		}

		const existingHighscore = await this.highscoreService.getSpecificHighscore(userId, quizId);
		if (existingHighscore instanceof Error) return existingHighscore;
		if (existingHighscore) {
			if (existingHighscore.score < completedQuizDTO.score) {
				const deletedHighscore = await this.highscoreService.deleteHighscore(existingHighscore.id);
				if (deletedHighscore instanceof Error) return deletedHighscore;

				const createdHighscore = await this.highscoreService.createHighscore({
					user_id: userId,
					quiz_id: quizId,
					score: completedQuizDTO.score,
				});
				if (createdHighscore instanceof Error) return createdHighscore;
				returnValue.highscore = 'updated';
                return returnValue;
			}
		}

		const createdHighscore = await this.highscoreService.createHighscore({
			user_id: userId,
			quiz_id: quizId,
			score: completedQuizDTO.score,
		});
		if (createdHighscore instanceof Error) return createdHighscore;
        returnValue.highscore = 'created';

		return returnValue;
	}
}
