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

	/**
	 * @description - Completes a quiz and updates the user's statistics
	 * @param {string} quizId - The quiz's id
	 * @param {string} userId - The user's id
	 * @param {CompletedQuizDTO} completedQuizDTO - The user's quiz data
	 * @returns {Promise<CompletedQuiz | Error>} - Returns the completed quiz or an error
	 */
	async completeQuiz(
		quizId: string,
		userId: string,
		completedQuizDTO: CompletedQuizDTO,
	): Promise<CompletedQuiz | Error> {
		// Object to be returned for consice information
		const returnValue: CompletedQuiz = {
			completed: false,
			newQuiz: null,
			highscore: null,
			message: null,
		};

		// Check if the quiz exists
		const quiz = await this.quizRepository.findOne(quizId);
		if (!quiz) throw new NotFoundException('Quiz not found');

		// Update the user's statistics
		const userStats = await this.userService.getStatistics(userId);
		if (userStats instanceof Error) return userStats;

		const updatedStats = await this.userService.updateStatistics(userId, {
			completed_quizzes: userStats.completed_quizzes + 1,
			points: userStats.points + completedQuizDTO.score,
			correct_answers: userStats.correct_answers + completedQuizDTO.correct_answers,
			incorrect_answers: userStats.incorrect_answers + completedQuizDTO.incorrect_answers,
		});
		if (updatedStats instanceof Error) return updatedStats;

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
		} else {
			const createdHighscore = await this.highscoreService.createHighscore({
				user_id: userId,
				quiz_id: quizId,
				score: completedQuizDTO.score,
			});
			if (createdHighscore instanceof Error) return createdHighscore;
			returnValue.highscore = 'created';
			return returnValue;
		}
		
		returnValue.highscore = 'not updated';
		return returnValue;
	}
}
