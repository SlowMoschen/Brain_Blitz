import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CompleteQuizEvent, QuizStartedEvent } from 'src/Events/quiz.events';
import { UserCreatedEvent } from 'src/Events/user.events';
import { SelectUserWithAllTables } from 'src/Utils/Types/model.types';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { UsersService } from '../users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { gameConfig } from 'src/Configs/game.config';

@Injectable()
export class GameService {
	constructor(
		private readonly userService: UsersService,
		private readonly quizRepository: QuizRepository,
	) {}

	/**
	 * @description - Adds energy to all users every .15 minute of the hour
	 * @returns {void}
	 */
	@Cron('*/15 * * * *')
	async addEnergy() {
		const users = await this.userService.getAllUsers();
		console.log('Adding energy to all users');
		users.forEach(async (user) => {
			if (user.energy < 100) {
				const energy =
					user.energy + gameConfig.ENERGY_REFRESH_RATE > 100 ? 100 : user.energy + gameConfig.ENERGY_REFRESH_RATE;
				await this.userService.updateUserEnergy(user.id, energy);
			}
		});
	}

	@OnEvent('quiz.started', { async: true, promisify: true })
	async addEnergyOnQuizStart({ user_id, quiz_id }: QuizStartedEvent) {
		const user = await this.userService.getUserByID(user_id);
		const quiz = await this.quizRepository.findOne(quiz_id);
		
		if (user.energy >= gameConfig.ENERGY_CONSUMPTION_RATE) {
			await this.userService.updateUserEnergy(user_id, user.energy - gameConfig.ENERGY_CONSUMPTION_RATE);
			await this.quizRepository.updateOne(quiz_id, { times_played: quiz.times_played + 1 });
		} else {
			return new HttpException('Not enough energy', HttpStatus.BAD_REQUEST);
		}

		return quiz;
	}

	/**
	 * @description - Inserts a completed quiz for the user
	 * @param completeQuizEvent
	 * @returns {string | Error} - Returns the completed quiz id or an error
	 */
	@OnEvent('quiz.completed')
	async insertCompletedQuiz(completeQuizEvent: CompleteQuizEvent) {
		const { user_id, quiz_id } = completeQuizEvent;
		const user = await this.userService.getUserByID(user_id);

		if (this.isQuizCompleted(user, quiz_id)) return new ConflictException('Quiz already completed');

		return await this.userService.insertNewCompletedQuiz(user_id, quiz_id);
	}

	/**
	 * @description - Unlocks the a random quiz for the user
	 * @param completeQuizEvent
	 * @returns {Promise<string | Error>} - Returns the unlocked quiz id or an error
	 */
	@OnEvent('quiz.completed')
	async unlockNextQuiz(completeQuizEvent: CompleteQuizEvent): Promise<string | Error> {
		const { user_id, quiz_id } = completeQuizEvent;

		const user = await this.userService.getUserByID(user_id);

		if (this.isQuizCompleted(user, quiz_id)) return new ConflictException('Quiz already completed');

		const newUnlockedQuiz = await this.getRandomNewQuiz(user_id);

		await this.userService.insertNewUnlockedQuiz(user_id, newUnlockedQuiz);
		const quiz = await this.quizRepository.findOne(newUnlockedQuiz);

		return quiz.title;
	}

	/**
	 * @description - Unlocks the first quizzes for a new user
	 * @param user_id
	 * @returns {void} - Returns the unlocked quiz id or an error
	 */
	@OnEvent('user.created')
	async unlockFirstQuiz({ user_id }: UserCreatedEvent): Promise<void> {
		for (let i = 0; i < gameConfig.START_QUIZ_COUNT; i++) {
			const newUnlockedQuiz = await this.getRandomNewQuiz(user_id);
			await this.userService.insertNewUnlockedQuiz(user_id, newUnlockedQuiz);
		}
	}

	/**
	 * @private
	 * @description - Gets a random quiz that the user has not unlocked yet
	 * @param user_id
	 * @returns {string} - Returns the quiz id or an error
	 */
	private async getRandomNewQuiz(user_id: string): Promise<string> {
		const user = await this.userService.getUserByID(user_id);

		const unlockedQuizzes = user.unlocked_quizzes.map((ref) => ref.quiz_id);

		const allQuizzes = await this.quizRepository.findAll();
		const allQuizzesIDs = allQuizzes.map((quiz) => quiz.id);

		const lockedQuizzes = allQuizzesIDs.filter((id) => !unlockedQuizzes.includes(id));
		const randomIndex = Math.floor(Math.random() * lockedQuizzes.length);

		return lockedQuizzes[randomIndex];
	}

	/**
	 * @private
	 * @description - Checks if the user has completed the quiz
	 * @param user
	 * @param quiz_id
	 * @returns {boolean} - Returns true if the user has completed the quiz, false otherwise
	 */
	private isQuizCompleted(user: SelectUserWithAllTables, quiz_id: string): boolean {
		return user.completed_quizzes.some((ref) => ref.quiz_id === quiz_id);
	}
}
