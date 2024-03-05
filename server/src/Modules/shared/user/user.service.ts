import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SelectUser, SelectUserWithAllTables } from 'src/Models/_types';
import { CreateUserDTO } from 'src/Modules/users/dto/create-user.dto';
import * as schema from '../../../Models/_index';
import { EncryptionService } from '../encryption/encryption.service';
import { UpdateUserCredentialsDTO } from 'src/Modules/users/dto/update-user-credentials.dto';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';

@Injectable()
export class UserService {
	constructor(
		@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
		private readonly encryptionService: EncryptionService,
	) {}

	/**
	 * @description - Queries the database for a user by email
	 * @param {string} email - The email of the user
	 * @returns {Promise<SelectUser[] | null>} - Returns all users or null if an error occurs or no users are found
	 */
	async getUserByEmail(email: string): Promise<SelectUser | null> {
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

	/**
	 * @description - Queries the database for a user by id
	 * @param {string} id - The id of the user
	 * @returns {Promise<SelectUser[] | null>} - Returns all users or null if an error occurs or no users are found
	 */
	async getUserById(id: string): Promise<SelectUser | null> {
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
	async getCompleteUser(): Promise<SelectUserWithAllTables[] | null> {
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
	async getCompleteUserById(id: string): Promise<SelectUserWithAllTables | null> {
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

	/**
	 * @description - Updates a user's credentials
	 * @param {string} id - The id of the user
	 * @param {UpdateUserCredentialsDTO} body - The body of the request containing the user's new credentials
	 * @returns {Promise<string| null | Error>} - Returns the id of the updated user or null if an error occurs
	 */
	async updateUser(id: string, body: UpdateUserCredentialsDTO): Promise<string | null | Error> {
		try {
			const user = await this.db
				.update(schema.usersTable)
				.set(body)
				.where(eq(schema.usersTable.id, id))
				.returning({ id: schema.usersTable.id });
			if (!user) return null;
			return user[0].id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Deletes a user by id
	 * @param {string} id - The id of the user
	 * @returns {Promise<string | null | Error>} - Returns the id of the deleted user or null if an error occurs
	 */
	async deleteUserById(id: string): Promise<string | null| Error> {
		try {
			const user = await this.db
				.delete(schema.usersTable)
				.where(eq(schema.usersTable.id, id))
				.returning({ id: schema.usersTable.id });
			if (!user) return null;
			return user[0].id;
		} catch (error) {
			return error;
		}
	}

}
