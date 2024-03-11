import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { CreateUserDTO } from 'src/Modules/users/dto/create-user.dto';
import { UpdateAppStateDTO } from 'src/Modules/users/dto/update-appstate.dto';
import { UpdateUserCredentialsDTO } from 'src/Modules/users/dto/update-user-credentials.dto';
import { UpdateUserSettingsDTO } from 'src/Modules/users/dto/update-user-settings.dto';
import { UpdateUserStatisticsDTO } from 'src/Modules/users/dto/update-user-statistics.dto';
import { SelectUser, SelectUserBillingInformation, SelectUserSettings, SelectUserStatistics, SelectUserTimestamps, SelectUserWithAllTables } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';
import { BillingInfoRepository } from './billingInfo.repository';
import { SettingsRepository } from './settings.repository';
import { StatisticsRepository } from './statistics.repository';
import { TimestampsRepository } from './timestamps.repository';

@Injectable()
export class UserRepository {
	constructor(
		@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
		private readonly settingsRepository: SettingsRepository,
		private readonly statisticsRepository: StatisticsRepository,
		private readonly timestampsRepository: TimestampsRepository,
		private readonly billingInfoRepository: BillingInfoRepository,
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
	async getUserByIdWithAllTables(id: string): Promise<SelectUser | [] | Error> {
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
	async getUserByEmail(email: string): Promise<SelectUser | [] | Error> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.email, email),
				with: {
					settings: true,
                    unlocked_quizzes: true,
                    unlocked_achievements: true,
                    highscores: true,
                    completed_quizzes: true,
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
	async insertNewUser(body: CreateUserDTO): Promise<string | [] | Error> {
		try {
			const user = await this.db.insert(schema.usersTable).values(body).returning({ id: schema.usersTable.id });

			if (user) {
				const userID = user[0].id;
				const defaultTables = await this.insertDefaultUserTables(userID);
				if (defaultTables) return userID;
			}

			return [];
		} catch (error) {
			// If one of the tables fails to be created, delete the user to avoid orphaned data and save space
			const deltededUser = await this.db.delete(schema.usersTable).where(eq(schema.usersTable.email, body.email));
			if (deltededUser) return new Error('User creation failed');

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
            await this.settingsRepository.deleteSettingsById(id);
            await this.statisticsRepository.deleteStatisticsById(id);
            await this.timestampsRepository.deleteTimestampsById(id);
            await this.billingInfoRepository.deleteBillingInfo(id);
           const deletedUser = await this.db.delete(schema.usersTable).where(eq(schema.usersTable.id, id)).returning({ id: schema.usersTable.id });
            return deletedUser ? deletedUser[0].id : [];
        } catch (error) {
            return error;
        }
    }

    async getSettings(id: string): Promise<SelectUserSettings | [] | Error> {
        return await this.settingsRepository.querySettingsById(id);
    }

    async getStatistics(id: string): Promise<SelectUserStatistics | [] | Error> {
        return await this.statisticsRepository.queryStatisticsById(id);
    }

    async getBillingInfo(id: string): Promise<SelectUserBillingInformation| [] | Error> {
        return await this.billingInfoRepository.queryBillingInfoById(id);
    }

    async getTimestamps(id: string): Promise<SelectUserTimestamps| [] | Error> {
        return await this.timestampsRepository.queryTimestampsById(id);
    }

    async updateSettings(id: string, body: UpdateUserSettingsDTO): Promise<string | [] | Error> {
        return await this.settingsRepository.updateSettings(id, body);
    }

    async updateStatistics(id: string, body: UpdateUserStatisticsDTO): Promise<string | [] | Error> {
        return await this.statisticsRepository.updateStatistics(id, body);
    }

}
