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
import { UsersService } from '../users/users.service';

@Injectable()
export class QuizService {
	constructor(
		private readonly quizRepository: QuizRepository,
		private readonly eventEmitter: EventEmitter2,
		private readonly highscoreService: HighscoreService,
		private readonly userService: UsersService,
	) {}

	async getAllQuizzes(): Promise<SelectQuiz[]> {
		return await this.quizRepository.findAll();
	}

	async getQuiz(id: string): Promise<SelectQuiz> {
		return await this.quizRepository.findOne(id);
	}

	async createQuiz(quiz: CreateQuizDTO): Promise<string> {
		return await this.quizRepository.insertOne(quiz);
	}

	async updateQuiz(id: string, quiz: UpdateQuizDTO): Promise<string> {
		return await this.quizRepository.updateOne(id, quiz);
	}

	async deleteQuiz(id: string): Promise<string> {
		return await this.quizRepository.deleteOne(id);
	}

	async getQuizzesByCategory(category: string): Promise<SelectQuiz[]> {
		return await this.quizRepository.findByCategory(category);
	}

	/**
	 * @description - Completes a quiz and updates the user's statistics
	 * @param {string} quizId - The quiz's id
	 * @param {string} userId - The user's id
	 * @param {CompletedQuizDTO} completedQuizDTO - The user's quiz data
	 * @returns {Promise<CompletedQuiz>} - Returns the completed quiz or an error
	 */
	async completeQuiz(quizId: string, userId: string, completedQuizDTO: CompletedQuizDTO): Promise<CompletedQuiz> {
		// Object to be returned for consice information
		const returnValue: CompletedQuiz = {
			completed: false,
			newQuiz: null,
			highscore: null,
			message: null,
		};

		// Check if the quiz exists
		await this.quizRepository.findOne(quizId);

		// Update the user's statistics
		const currentStats = await this.userService.getStatistics(userId);
		await this.userService.updateStatistics(userId, {
			completed_quizzes: currentStats.completed_quizzes + 1,
			points: currentStats.points + completedQuizDTO.score,
			correct_answers: currentStats.correct_answers + completedQuizDTO.correct_answers,
			incorrect_answers: currentStats.incorrect_answers + completedQuizDTO.incorrect_answers,
		});

		// Check if the threshold for unlocking a new quiz has been reached - if so, emit an event to complete the quiz and unlock a new one
		if (completedQuizDTO.score >= parseInt(process.env.QUIZ_UNLOCK_THRESHOLD)) {
			const [completedQuiz, unlockedQuiz] = await this.eventEmitter.emitAsync(
				'quiz.completed',
				new CompleteQuizEvent(userId, quizId, completedQuizDTO.score),
			);
			if (completedQuiz instanceof Error) returnValue.message = completedQuiz.message;
			if (unlockedQuiz instanceof Error) returnValue.newQuiz = unlockedQuiz.message;
			if (typeof completedQuiz === 'string') returnValue.completed = true;
			if (typeof unlockedQuiz === 'string') returnValue.newQuiz = unlockedQuiz;
		}

		// Check if the user has a highscore for the quiz and update it if necessary - if not, create a new highscore
		const existingHighscore = await this.highscoreService.getSpecificHighscore(userId, quizId);

		if (existingHighscore) {
			if (existingHighscore.score < completedQuizDTO.score) {
				await this.highscoreService.deleteHighscore(existingHighscore.id);
				returnValue.highscore = 'updated';
			} else {
				returnValue.highscore = 'not updated';
				return returnValue;
			}
		} else {
			returnValue.highscore = 'created';
		}

		// Create a new highscore for the user
		const createdHighscoreID = await this.highscoreService.createHighscore({
			user_id: userId,
			quiz_id: quizId,
			score: completedQuizDTO.score,
		});

		// Insert a junction table entry for the highscore
		await this.userService.insertNewHighscore(userId, createdHighscoreID);

		return returnValue;
	}

	/**
	 * @description - Returns statistics about the quizzes
	 * @returns {Promise<{ totalQuestions: number, totalQuizzes: number, uniqueCategories: number, categoryStats: { category: string, totalQuestions: number, totalQuizzes: number }[] }>}
	 */
	async getStats() {
		const quizzes = await this.quizRepository.findAll();

		const uniqueCategories = [...new Set(quizzes.map((quiz) => quiz.category))];
		const categoryStats = uniqueCategories.map((category) => {
			const categoryQuizzes = quizzes.filter((quiz) => quiz.category === category);
			const totalQuestions = categoryQuizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
			return {
				category,
				totalQuestions,
				totalQuizzes: categoryQuizzes.length,
			};
		});
		const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);

		return { totalQuestions, totalQuizzes: quizzes.length, uniqueCategories: uniqueCategories.length, categoryStats };
	}
}
