import { ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
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
	 * @returns {Promise<SelectUserWithAllTables[]>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async findAll(): Promise<SelectUser[]> {
		const users = await this.db.query.usersTable.findMany({
			with: {
				unlocked_quizzes: { with: { quiz: true } },
				completed_quizzes: true,
				highscores: true,
				unlocked_achievements: true,
				statistics: true,
				billing_information: true,
				settings: true,
				timestamps: true,
				tokens: true,
			},
		});
		if (users instanceof Error) throw users;
		if (users.length === 0) throw new NotFoundException('No users found');
		return users;
	}

	/**
	 * @description - Queries the database for a user by id with all tables included
	 * @param {string} id - The id of the user
	 * @returns {Promise<SelectUserWithAllTables>} - Returns a user with all tables or an empty array if no user is found and an error if an error occurs
	 */
	async findByID(id: string): Promise<SelectUser> {
		const user = await this.db.query.usersTable.findFirst({
			where: eq(schema.usersTable.id, id),
			with: {
				settings: true,
				unlocked_quizzes: { with: { quiz: true } },
				unlocked_achievements: true,
				highscores: true,
				completed_quizzes: { with: { quiz: true }},
				billing_information: true,
				statistics: true,
				timestamps: true,
				tokens: true,
			},
		});
		if (user instanceof Error) throw user;
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	/**
	 * @description - Queries the database for a user by email
	 * @param {string} email - The email of the user
	 * @returns {Promise<SelectUserWithAllTables>} - Returns a user with all tables or null if an error occurs or no user is found
	 */
	async findByEmail(email: string): Promise<SelectUser> {
		const user = await this.db.query.usersTable.findFirst({
			where: eq(schema.usersTable.email, email),
			with: {
				settings: true,
				unlocked_quizzes: { with: { quiz: true } },
				unlocked_achievements: true,
				highscores: true,
				completed_quizzes: true,
				billing_information: true,
				statistics: true,
				timestamps: true,
				tokens: true,
			},
		});
		if (user instanceof Error) throw user;
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	/**
	 * @description - Creates a new user
	 * @param body - The body of the request - validation was done by the controller via the CreateUserDTO
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertOne(body: CreateUserDTO): Promise<SelectUser> {
		try {
			const user = await this.db.insert(schema.usersTable).values(body).returning({ id: schema.usersTable.id });
			if (!user[0]) throw new NotImplementedException('User creation failed');
			const userID = user[0].id;
			await this.insertDefaultUserTables(userID);
			return await this.findByID(userID);
		} catch (error) {
			if (error.code === '23505') throw new ConflictException('User mit dieser E-Mail existiert bereits');
			throw error;
		}
	}

	/**
	 * @description - Inserts all default tables for a new user
	 * @param {string} userID - The id of the user
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user created and an error if an error occurs
	 */
	private async insertDefaultUserTables(userID: string): Promise<string> {
		const settings = await this.settingsRepository.insertDefaultTable(userID);
		const statistics = await this.statisticsRepository.insertDefaultTable(userID);
		const timestamps = await this.timestampsRepository.insertDefaultTable(userID);
		const billingInfo = await this.billingInfoRepository.insertDefaultTable(userID);

		if (settings && statistics && timestamps && billingInfo) return userID;
	}

	/**
	 * @description - Updates a user by id
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateOneCredentials(id: string, body: UpdateUserCredentialsDTO): Promise<string> {
		const updatedUser = await this.db
			.update(schema.usersTable)
			.set(body)
			.where(eq(schema.usersTable.id, id))
			.returning({ id: schema.usersTable.id });
		if (updatedUser instanceof Error) throw updatedUser;
		if (!updatedUser[0]) throw new NotImplementedException('Updating user failed');
		return updatedUser[0].id;
	}

	async updateOneEnergy(id: string, energy: number): Promise<string> {
		const updatedUser = await this.db
			.update(schema.usersTable)
			.set({ energy })
			.where(eq(schema.usersTable.id, id))
			.returning({ id: schema.usersTable.id });
		if (updatedUser instanceof Error) throw updatedUser;
		if (!updatedUser[0]) throw new NotImplementedException('Updating user energy failed');
		return updatedUser[0].id;
	}

	/**
	 * @description - Completely deletes a user with all corresponding Tables by id
	 * @param id - The id of the user
	 * @returns {Promise<string>} - Returns the id of the deleted user or null if an error occurs
	 */
	async deleteOneByID(id: string): Promise<string> {
		await this.db.delete(schema.unlockedQuizzes).where(eq(schema.unlockedQuizzes.user_id, id));
		await this.db.delete(schema.completedQuizzes).where(eq(schema.completedQuizzes.user_id, id));
		await this.db.delete(schema.highscores).where(eq(schema.highscores.user_id, id));
		await this.db.delete(schema.unlockedAchievements).where(eq(schema.unlockedAchievements.user_id, id));
		await this.tokenRepository.deleteTokensByUserId(id);
		await this.settingsRepository.deleteOne(id);
		await this.statisticsRepository.deleteOne(id);
		await this.timestampsRepository.deleteOne(id);
		await this.billingInfoRepository.deleteOne(id);
		const deletedUser = await this.db
			.delete(schema.usersTable)
			.where(eq(schema.usersTable.id, id))
			.returning({ id: schema.usersTable.id });
		return deletedUser[0].id;
	}

	/**
	 * @description - Completely deletes a user with all corresponding Tables by email
	 * @param email - The email of the user
	 * @returns {Promise<string>} - Returns the id of the deleted user or null if an error occurs
	 */
	async deleteOneByEmail(email: string): Promise<string> {
		const user = await this.findByEmail(email);
		return await this.deleteOneByID(user.id);
	}

	/**
	 * @description - Queries the database for a users settings table by id
	 * @returns {Promise<SelectUserWithAllTables[]>} - Returns all users with all table or null if an error occurs or no users are found
	 */
	async findOneSettings(id: string): Promise<SelectUserSettings> {
		return await this.settingsRepository.findByID(id);
	}

	/**
	 * @description - Queries the database for a users statistics table by id
	 * @returns {Promise<SelectUserStatistics>} - Returns all users with all table or null if an error occurs or no users are found
	 */
	async findOneStats(id: string): Promise<SelectUserStatistics> {
		return await this.statisticsRepository.findByID(id);
	}

	/**
	 * @description - Queries the database for a users billing info table by id
	 * @returns {Promise<SelectUserWithAllTables[]>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async findOneBillingInfo(id: string): Promise<SelectUserBillingInformation> {
		return await this.billingInfoRepository.findByID(id);
	}

	/**
	 * @description - Queries the database for a users timestamps table by id
	 * @returns {Promise<SelectUserWithAllTables[]>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async findOneTimestamps(id: string): Promise<SelectUserTimestamps> {
		return await this.timestampsRepository.findByID(id);
	}

	/**
	 * @description - Updates a users settings table by id - also updates the corresponding timestamps table
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateOneSettings(id: string, body: UpdateUserSettingsDTO): Promise<string> {
		await this.timestampsRepository.updateOneColumn(id, 'settings_updated_at');
		return await this.settingsRepository.updateOne(id, body);
	}

	/**
	 * @description - Updates a users statistics table by id - also updates the corresponding timestamps table
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateOneStats(id: string, body: UpdateUserStatisticsDTO): Promise<string> {
		await this.timestampsRepository.updateOneColumn(id, 'statistics_updated_at');
		return await this.statisticsRepository.updateOne(id, body);
	}

	/**
	 * @description - Updates a users billing info table by id - also updates the corresponding timestamps table
	 * @param id - The id of the user
	 * @param body - The body of the request
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async updateOneBillingInfo(id: string, body: UpdateUserBillingInfoDTO): Promise<string> {
		await this.timestampsRepository.updateOneColumn(id, 'billing_information_updated_at');
		return await this.billingInfoRepository.updateOne(id, body);
	}

	/**
	 * @description - Inserts a new unlocked quiz
	 * @param {string} id - The id of the user
	 * @param {string} quizID - The id of the quiz
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewUnlockedQuiz(id: string, quizID: string): Promise<string> {
		const newQuiz = await this.db
			.insert(schema.unlockedQuizzes)
			.values({ user_id: id, quiz_id: quizID })
			.returning({ user_id: schema.unlockedQuizzes.user_id });
		if (newQuiz instanceof Error) throw newQuiz;
		if (!newQuiz[0]) throw new NotImplementedException('Inserting new unlocked quiz failed');
		return newQuiz[0].user_id;
	}

	/**
	 * @description - Inserts a new unlocked achievement
	 * @param {string} id - The id of the user
	 * @param {string} achievementID - The id of the achievement
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewUnlockedAchievement(id: string, achievementID: string): Promise<string> {
		const newAchievement = await this.db
			.insert(schema.unlockedAchievements)
			.values({ user_id: id, achievement_id: achievementID })
			.returning({ user_id: schema.unlockedAchievements.user_id });
		if (newAchievement instanceof Error) throw newAchievement;
		if (!newAchievement[0]) throw new NotImplementedException('Inserting new unlocked achievement failed');
		return newAchievement[0].user_id;
	}

	/**
	 * @description - Inserts a new highscore
	 * @param {string} id - The id of the user
	 * @param {string} highscoreID - The id of the highscore
	 * @param {number} score - The score of the highscore
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewHighscore(user_id: string, highscore_id: string): Promise<string> {
		const newHighscore = await this.db
			.insert(schema.highscores)
			.values({
				user_id,
				highscore_id,
			})
			.returning({ user_id: schema.highscores.user_id });
		if (newHighscore instanceof Error) throw newHighscore;
		if (!newHighscore[0]) throw new NotImplementedException('Inserting new highscore failed');
		return newHighscore[0].user_id;
	}

	/**
	 * @description - Deletes a highscore by id
	 * @param {string} id - The id of the highscore
	 * @returns {Promise<SelectUserWithAllTables[]>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async deleteHighscore(id: string, highscore_id: string): Promise<string> {
		const deletedHighscore = await this.db
			.delete(schema.highscores)
			.where(and(eq(schema.highscores.user_id, id), eq(schema.highscores.highscore_id, highscore_id)))
			.returning({ user_id: schema.highscores.user_id });
		if (deletedHighscore instanceof Error) throw deletedHighscore;
		if (!deletedHighscore[0]) throw new NotImplementedException('Deleting highscore failed');
		return deletedHighscore[0].user_id;
	}

	/**
	 * @description - Inserts a new completed quiz
	 * @param {string} id - The id of the user
	 * @param {string} quizID - The id of the quiz
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async insertNewCompletedQuiz(user_id: string, quiz_id: string): Promise<string> {
		const newCompletedQuiz = await this.db
			.insert(schema.completedQuizzes)
			.values({ user_id, quiz_id })
			.returning({ user_id: schema.completedQuizzes.user_id });
		if (newCompletedQuiz instanceof Error) throw newCompletedQuiz;
		if (!newCompletedQuiz[0]) throw new NotImplementedException('Inserting new completed quiz failed');
		return newCompletedQuiz[0].user_id;
	}

	/**
	 * @description - Updates a users highscore
	 * @param {string} id - The id of the user
	 * @param {string} highscoreID - The id of the highscore
	 * @param {number} score - The score of the highscore
	 * @returns {Promise<string>} - Returns the userID or an empty array if no user is found and an error if an error occurs
	 */
	async setVerificationStatus(id: string, status: boolean): Promise<string> {
		const updatedStatus = await this.db
			.update(schema.usersSettingsTable)
			.set({ is_verified: status })
			.where(eq(schema.usersSettingsTable.user_id, id))
			.returning({ id: schema.usersSettingsTable.user_id });
		if (updatedStatus instanceof Error) throw updatedStatus;
		if (!updatedStatus[0]) throw new NotImplementedException('Updating verification status failed');
		return updatedStatus[0].id;
	}
}
