import { ConflictException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import { gameConfig } from 'src/Configs/game.config';
import { CompleteQuizEvent, QuizStartedEvent } from 'src/Events/quiz.events';
import { UserCreatedEvent } from 'src/Events/user.events';
import { SelectUserWithAllTables } from 'src/Utils/Types/model.types';
import { QuizRepository } from '../shared/database/Repositories/Quiz/quiz.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class GameService {
	private readonly logger = new Logger('GameService');
	constructor(
		private readonly userService: UsersService,
		private readonly quizRepository: QuizRepository,
	) {}

	//MARK: - ENERGY EVENTS
	/**
	 * @description - Adds energy to all users every .15 minute of the hour
	 * @returns {void}
	 */
	@Cron('*/15 * * * *')
	async addEnergy() {
		const users = await this.userService.getAllUsers();
		this.logger.log('Adding energy to all users');
		users.forEach(async (user) => {
			if (user.energy < 100) {
				const energy =
					user.energy + gameConfig.ENERGY_REFRESH_RATE > 100 ? 100 : user.energy + gameConfig.ENERGY_REFRESH_RATE;
				await this.userService.updateUserEnergy(user.id, energy);
			}
		});
	}
	//MARK: - QUIZ EVENTS
	@OnEvent('quiz.started', { async: true, promisify: true })
	async addEnergyOnQuizStart({ user_id, quiz_id }: QuizStartedEvent) {
		const user = await this.userService.getUserByID(user_id);
		const quiz = await this.quizRepository.findOne(quiz_id);

		if (process.env.NODE_ENV === 'development') {
			this.logger.log('Setting energy to 100 for development purposes');
			await this.userService.updateUserEnergy(user_id, 100);
		}

		if (user.energy >= gameConfig.ENERGY_CONSUMPTION_RATE) {
			this.logger.log(`${user.id} started quiz ${quiz.id}`)
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

		this.logger.log(`User ${user_id} completed quiz ${quiz_id}`);
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

		this.logger.log(`User ${user_id} unlocked quiz ${newUnlockedQuiz}`);
		await this.userService.insertNewUnlockedQuiz(user_id, newUnlockedQuiz);
		const quiz = await this.quizRepository.findOne(newUnlockedQuiz);

		return quiz.id;
	}

	//MARK: - USER EVENTS
	/**
	 * @description - Unlocks the first quizzes for a new user
	 * @param user_id
	 * @returns {void} - Returns the unlocked quiz id or an error
	 */
	@OnEvent('user.created')
	async unlockFirstQuiz({ user_id }: UserCreatedEvent): Promise<void> {
		const selectedQuizzes = new Set<string>();
		while (selectedQuizzes.size < gameConfig.START_QUIZ_COUNT) {
			const randomQuiz = await this.getRandomNewQuiz(user_id);
			if (selectedQuizzes.has(randomQuiz)) break;

			selectedQuizzes.add(randomQuiz);
			await this.userService.insertNewUnlockedQuiz(user_id, randomQuiz);
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

		const lockedIds = allQuizzesIDs.filter((id) => !unlockedQuizzes.includes(id));
		const randomIndex = Math.floor(Math.random() * lockedIds.length);

		return lockedIds[randomIndex];
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
