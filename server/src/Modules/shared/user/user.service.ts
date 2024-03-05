import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SelectUser, SelectUserWithAllTables } from 'src/Models/_types';
import { CreateUserDTO } from 'src/Modules/auth/dto/create-user.dto';
import * as schema from '../../../Models/_index';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class UserService {
	constructor(
		@Inject('DB_CONNECTION') private readonly db: NodePgDatabase<typeof schema>,
		private readonly encryptionService: EncryptionService,
	) {}

    async queryUserCredentialsByEmail(email: string): Promise<SelectUser | null> {
        try {
            const user = await this.db.query.usersTable.findFirst({
                where: eq(schema.usersTable.email, email),
            });

            if (!user) return null;
            return user;
        } catch (error) {
            return error;
        }
    }

    async queryUserCredentialsById(id: string): Promise<SelectUser | null> {
        try {
            const user = await this.db.query.usersTable.findFirst({
                where: eq(schema.usersTable.id, id),
            });

            if (!user) return null;
            return user;
        } catch (error) {
            return error;
        }
    }

	/**
	 * @returns {Promise<SelectUserWithAllTables[] | null>} - Returns all users with all tables or null if an error occurs or no users are found
	 */
	async queryAllUsersWithAllTables(): Promise<SelectUserWithAllTables[] | null> {
		try {
			const users = await this.db.query.usersTable.findMany({
				with: {
					app_states: true,
					billing_information: true,
					settings: true,
					statistics: true,
					timestamps: true,
					tokens: true,
				},
			});

			if (!users) return null;
			return users;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with all tables or null if an error occurs or no user is found
	 */
	async queryUserWithAllTablesById(id: string): Promise<SelectUserWithAllTables | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					app_states: true,
					billing_information: true,
					settings: true,
					statistics: true,
					timestamps: true,
					tokens: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the app_states table or null if an error occurs or no user is found
	 */
	async queryUserWithAppStatesById(id: string): Promise<SelectUser | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					app_states: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the billing_information table or null if an error occurs or no user is found
	 */
	async queryUserWithBillingInformationById(id: string): Promise<SelectUser | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					billing_information: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the settings table or null if an error occurs or no user is found
	 */
	async queryUserWithSettingsById(id: string): Promise<SelectUser | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					settings: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the statistics table or null if an error occurs or no user is found
	 */

	async queryUserWithStatisticsById(id: string): Promise<SelectUser | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					statistics: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the timestamps table or null if an error occurs or no user is found
	 */
	async queryUserWithTimestampsById(id: string): Promise<SelectUser | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					timestamps: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @returns {Promise<SelectUser[] | null>} - Returns a user with only the tokens table or null if an error occurs or no user is found
	 */
	async queryUserWithTokensById(id: string): Promise<SelectUser | null> {
		try {
			const user = await this.db.query.usersTable.findFirst({
				where: eq(schema.usersTable.id, id),
				with: {
					tokens: true,
				},
			});

			if (!user) return null;
			return user;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Inserts a new User with all corresponding tables - if an error occurs, the user is deleted
	 * @param {CreateUserDTO} body - The body of the request containing the user's information
	 * @returns {Promise<string | Error>} - Returns the id of the new user or an Error if an error occurs
	 */
	async insertNewUser(body: CreateUserDTO): Promise<string | Error> {
		let userID: string;

		try {
			const hashedPassword = await this.encryptionService.hashPassword(body.password);

			const newUser = await this.db
				.insert(schema.usersTable)
				.values({
					first_name: body.first_name,
					last_name: body.last_name,
					email: body.email,
					password: hashedPassword,
				})
				.returning({ id: schema.usersTable.id });

			if (!newUser) throw new Error('User creation failed');
			userID = newUser[0].id;

			const foo = await this.insertDefaultUserTables(userID);
			if (foo instanceof Error) throw new Error('Error inserting default user tables');

			return userID;
		} catch (error) {
			if (error.message === 'Error inserting default user tables') {
				const deleteUser = await this.db.delete(schema.usersTable).where(eq(schema.usersTable.id, userID));
				if (!deleteUser) throw new Error('Error deleting user');
                return new Error('User creation failed');
			}

			return error;
		}
	}

	/**
	 * @description - Iterates through the default user tables wich are needed for a new user and inserts them
	 * @param {string} userId - The id of the new user
	 * @returns {Promise<string | Error>} - Returns the id of the new user or an Error if an error occurs
	 */
	private async insertDefaultUserTables(userId: string): Promise<string | Error> {
		try {
			const tables = [
				schema.usersSettingsTable,
				schema.usersStatisticsTable,
				schema.usersTimestampsTable,
				schema.usersBillingInformationTable,
				schema.usersAppStates,
			];

			for (const table of tables) {
				const newTable = await this.db
					.insert(table)
					.values({
						user_id: userId,
					})
					.returning({ id: table.id });
				if (!newTable) throw new Error(`Error inserting new ${table._.name}`);
			}
			return userId;
		} catch (error) {
			return error;
		}
	}
}
