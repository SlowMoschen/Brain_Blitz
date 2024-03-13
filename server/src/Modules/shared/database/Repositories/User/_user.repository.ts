import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { CreateUserDTO } from 'src/Modules/auth/dto/create-user.dto';
import { UpdateUserBillingInfoDTO } from 'src/Modules/users/dto/update-user-billingInfo.dto';
import { UpdateUserCredentialsDTO } from 'src/Modules/users/dto/update-user-credentials.dto';
import { UpdateUserSettingsDTO } from 'src/Modules/users/dto/update-user-settings.dto';
import { UpdateUserStatisticsDTO } from 'src/Modules/users/dto/update-user-statistics.dto';
import {
	SelectUser,
	SelectUserBillingInformation,
	SelectUserSettings,
	SelectUserStatistics,
	SelectUserTimestamps,
} from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';
import { BillingInfoRepository } from './billingInfo.repository';
import { SettingsRepository } from './settings.repository';
import { StatisticsRepository } from './statistics.repository';
import { TimestampsRepository } from './timestamps.repository';
import { TokenRepository } from '../Token/token.repository';

/**
 * @description - Repository for the user table - contains all methods for querying all the tables related to the user
 * @exports UserRepository
 * @imports All other user related repositories
 */

@Injectable()
export class UserRepository {
	constructor(
		@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
		private readonly settingsRepository: SettingsRepository,
		private readonly statisticsRepository: StatisticsRepository,
		private readonly timestampsRepository: TimestampsRepository,
		private readonly billingInfoRepository: BillingInfoRepository,
		private readonly tokenRepository: TokenRepository,
	) {}

	/**
	 * @description - Queries the database for all users with all tables included
	 * @returns {Promise<SelectUserWithAllTables[] | [] | Error>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async getAllUsersWithAllTables(): Promise<SelectUser[] | [] | Error> {
		try {
			const users = await this.db.query.usersTable.findMany({
				with: {
					unlocked_quizzes: true,
					completed_quizzes: true,
					unlocked_achievements: true,
					highscores: true,
					statistics: true,
					billing_information: true,
					settings: true,
					timestamps: true,
					tokens: true,
				},
			});
			return users;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Queries the database for a user by id with all tables included
	 * @param {string} id - The id of the user
	 * @returns {Promise<SelectUserWithAllTables | [] | Error>} - Returns a user with all tables or an empty array if no user is found and an error if an error occurs
	 */
	async getUserByIdWithAllTables(id: string): Promise<SelectUser | Error> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					completed_quizzes: true,
					highscores: true,
					unlocked_achievements: true,
					unlocked_quizzes: true,
					statistics: true,
					billing_information: true,
					settings: true,
					timestamps: true,
					tokens: true,
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Queries the database for a user by email
	 * @param {string} email - The email of the user
	 * @returns {Promise<SelectUserWithAllTables | [] | Error>} - Returns a user with all tables or null if an error occurs or no user is found
	 */
	async getUserByEmailWithAllTables(email: string): Promise<SelectUser | Error> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.email, email),
				with: {
					settings: true,
					unlocked_quizzes: true,
					unlocked_achievements: true,
					highscores: true,
					completed_quizzes: true,
					billing_information: true,
					statistics: true,
					timestamps: true,
					tokens: true,
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Queries the database for a user by id
	 * @param {string} id - The id of the user
	 * @returns {Promise<SelectUser | [] | Error>} - Returns a user or an empty array if no user is found and an error if an error occurs
	 */
	async getUserById(id: string): Promise<SelectUser | [] | Error> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					completed_quizzes: true,
					highscores: true,
					unlocked_achievements: true,
					unlocked_quizzes: true,
					settings: true,
				},
			});
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Creates a new user
	 * @param body - The body of the request - validation was done by the controller via the CreateUserDTO
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewUser(body: CreateUserDTO): Promise<SelectUser | [] | Error> {
		try {
			const createdUser = await this.db.insert(schema.usersTable).values(body).returning({ id: schema.usersTable.id });
			if (createdUser) {
				const userID = createdUser[0].id;
				const defaultTables = await this.insertDefaultUserTables(userID);
				if (defaultTables) {
					return await this.getUserByIdWithAllTables(userID);
				}
			}

			return [];
		} catch (error) {
			// If the user with provided email already exists, return an error
			if (error.code === '23505' ) {
				return new Error('User with this email already exists');
			}
			// If one of the tables fails to be created, delete the user to avoid orphaned data and save space
			const deletedUser = await this.deleteUserByEmail(body.email);
			if (deletedUser instanceof Error) return deletedUser;
			return error;
		}
	}

	/**
	 * @description - Inserts all default tables for a new user
	 * @param {string} userID - The id of the user
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user created and an error if an error occurs
	 */
	private async insertDefaultUserTables(userID: string): Promise<string | [] | Error> {
		try {
			const settings = await this.settingsRepository.insertDefaultTable(userID);
			const statistics = await this.statisticsRepository.insertDefaultTable(userID);
			const timestamps = await this.timestampsRepository.insertDefaultTable(userID);
			const billingInfo = await this.billingInfoRepository.insertDefaultTable(userID);

			if (settings && statistics && timestamps && billingInfo) return userID;
			return [];
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Updates a user by id
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateUserCredentials(id: string, body: UpdateUserCredentialsDTO): Promise<string | [] | Error> {
		try {
			const user = await this.db
				.update(schema.usersTable)
				.set(body)
				.where(eq(schema.usersTable.id, id))
				.returning({ id: schema.usersTable.id });

			await this.timestampsRepository.updateUserTimestamp(id, 'updated_at');
			return user ? user[0].id : [];
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Completely deletes a user with all corresponding Tables by id
	 * @param id - The id of the user
	 * @returns {Promise<string | [] | Error>} - Returns the id of the deleted user or null if an error occurs
	 */
	async deleteUserById(id: string): Promise<string | [] | Error> {
		try {
			await this.tokenRepository.deleteTokensByUserId(id);
			await this.settingsRepository.deleteSettingsById(id);
			await this.statisticsRepository.deleteStatisticsById(id);
			await this.timestampsRepository.deleteTimestampsById(id);
			await this.billingInfoRepository.deleteBillingInfo(id);
			const deletedUser = await this.db
				.delete(schema.usersTable)
				.where(eq(schema.usersTable.id, id))
				.returning({ id: schema.usersTable.id });
			return deletedUser ? deletedUser[0].id : [];
		} catch (error) {
			return error;
		}
	}

	async deleteUserByEmail(email: string): Promise<string | [] | Error> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.email, email),
			});
			if (!user) return new Error('User not found');

			await this.tokenRepository.deleteTokensByUserId(user.id);
			await this.settingsRepository.deleteSettingsById(user.id);
			await this.statisticsRepository.deleteStatisticsById(user.id);
			await this.timestampsRepository.deleteTimestampsById(user.id);
			await this.billingInfoRepository.deleteBillingInfo(user.id);
			const deletedUser = await this.db
				.delete(schema.usersTable)
				.where(eq(schema.usersTable.email, email))
				.returning({ id: schema.usersTable.id });
			return deletedUser ? deletedUser[0].id : [];
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Queries the database for a users settings table by id
	 * @returns {Promise<SelectUserWithAllTables[] | [] | Error>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async getSettings(id: string): Promise<SelectUserSettings | [] | Error> {
		return await this.settingsRepository.querySettingsById(id);
	}

	/**
	 * @description - Queries the database for a users statistics table by id
	 * @returns {Promise<SelectUserWithAllTables[] | [] | Error>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async getStatistics(id: string): Promise<SelectUserStatistics | [] | Error> {
		return await this.statisticsRepository.queryStatisticsById(id);
	}

	/**
	 * @description - Queries the database for a users billing info table by id
	 * @returns {Promise<SelectUserWithAllTables[] | [] | Error>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async getBillingInfo(id: string): Promise<SelectUserBillingInformation | [] | Error> {
		return await this.billingInfoRepository.queryBillingInfoById(id);
	}

	/**
	 * @description - Queries the database for a users timestamps table by id
	 * @returns {Promise<SelectUserWithAllTables[] | [] | Error>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async getTimestamps(id: string): Promise<SelectUserTimestamps | [] | Error> {
		return await this.timestampsRepository.queryTimestampsById(id);
	}

	/**
	 * @description - Updates a users settings table by id - also updates the corresponding timestamps table
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateSettings(id: string, body: UpdateUserSettingsDTO): Promise<string | [] | Error> {
		await this.timestampsRepository.updateUserTimestamp(id, 'settings_updated_at');
		return await this.settingsRepository.updateSettings(id, body);
	}

	/**
	 * @description - Updates a users statistics table by id - also updates the corresponding timestamps table
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateStatistics(id: string, body: UpdateUserStatisticsDTO): Promise<string | [] | Error> {
		await this.timestampsRepository.updateUserTimestamp(id,'statistics_updated_at');
		return await this.statisticsRepository.updateStatistics(id, body);
	}

	/**
	 * @description - Updates a users billing info table by id - also updates the corresponding timestamps table
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateBillingInfo(id: string, body: UpdateUserBillingInfoDTO): Promise<string | [] | Error> {
		await this.timestampsRepository.updateUserTimestamp(id, 'billing_information_updated_at');
		return await this.billingInfoRepository.updateBillingInfo(id, body);
	}

	/**
	 * @description - Inserts a new unlocked quiz
	 * @param {string} id - The id of the user
	 * @param {string} quizID - The id of the quiz
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewUnlockedQuiz(id: string, quizID: string): Promise<string | Error> {
		const newQuiz = await this.db
			.insert(schema.unlockedQuizzes)
			.values({ user_id: id, quiz_id: quizID })
			.returning({ user_id: schema.unlockedQuizzes.user_id });
		return newQuiz ? newQuiz[0].user_id : new Error('Inserting new unlocked quiz failed');
	}

	/**
	 * @description - Inserts a new unlocked achievement
	 * @param {string} id - The id of the user
	 * @param {string} achievementID - The id of the achievement
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewUnlockedAchievement(id: string, achievementID: string): Promise<string | Error> {
		const newAchievement = await this.db
			.insert(schema.unlockedAchievements)
			.values({ user_id: id, achievement_id: achievementID })
			.returning({ user_id: schema.unlockedAchievements.user_id });
		return newAchievement ? newAchievement[0].user_id : new Error('Inserting new unlocked achievement failed');
	}

	/**
	 * @description - Inserts a new highscore
	 * @param {string} id - The id of the user
	 * @param {string} highscoreID - The id of the highscore
	 * @param {number} score - The score of the highscore
	 * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewHighscore(user_id: string, highscore_id: string, score: number): Promise<string | Error> {
		const newHighscore = await this.db
			.insert(schema.highscores)
			.values({
				user_id,
				highscore_id,
				score
			})
			.returning({ user_id: schema.highscores.user_id });
		return newHighscore ? newHighscore[0].user_id : new Error('Inserting new highscore failed');
	}

	/**
	 * @description - Inserts a new completed quiz
	 * @param {string} id - The id of the user
	 * @param {string} quizID - The id of the quiz
	 * @returns {Promise<string | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewCompletedQuiz(user_id: string, quiz_id: string): Promise<string | Error> {
		const newCompletedQuiz = await this.db
			.insert(schema.completedQuizzes)
			.values({ user_id, quiz_id })
			.returning({ user_id: schema.completedQuizzes.user_id });
		return newCompletedQuiz ? newCompletedQuiz[0].user_id : new Error('Inserting new completed quiz failed');
	}

	/**
	 * @description - Updates a users highscore
	 * @param {string} id - The id of the user
	 * @param {string} highscoreID - The id of the highscore
	 * @param {number} score - The score of the highscore
	 * @returns {Promise<string | Error>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async setVerificationStatus(id: string, status: boolean): Promise<string | Error> {
		const updatedStatus = await this.db
			.update(schema.usersSettingsTable)
			.set({ is_verified: status })
			.where(eq(schema.usersSettingsTable.user_id, id))
			.returning({ id: schema.usersSettingsTable.user_id });
		return updatedStatus ? updatedStatus[0].id : new Error('Updating verification status failed');
	}
}
