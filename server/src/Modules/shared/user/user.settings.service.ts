import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import * as schema from 'src/Models/_index';
import { SelectUserSettings } from 'src/Utils/Types/model.types';
import { UpdateUserSettingsDTO } from 'src/Modules/users/dto/update-user-settings.dto';

@Injectable()
export class SettingsService {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description - Queries the database for all user settings Rows
	 * @returns {Promise<SelectUserSettings[]| null>} - Returns all user settings or null if an error occurs or no settings are found
	 */
	async getUserSettings(): Promise<SelectUserSettings[] | null> {
		try {
			const settings = await this.db.select().from(schema.usersSettingsTable);
			if (!settings) return null;
			return settings;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Queries the database for a user settings by id
	 * @param {string} id - The id of the user
	 * @returns {Promise<SelectUserSettings | null>} - Returns a user settings or null if an error occurs or no settings are found
	 */
	async getUserSettingsById(id: string): Promise<SelectUserSettings | null> {
		try {
			const settings = await this.db.query.usersSettingsTable.findFirst({
				where: eq(schema.usersSettingsTable.user_id, id),
			});
			if (!settings) return null;
			return settings;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Updates a user settings by id
	 * @param {string} id - The id of the user
	 * @param {UpdateUserSettingsDTO} body - The body of the request
	 * @returns {Promise<string | null>} - Returns the userID or null if an error occurs or no settings are found
	 */
	async updateUserSettings(id: string, body: UpdateUserSettingsDTO): Promise<string | null | Error> {
		try {
			const settings = await this.db
				.update(schema.usersSettingsTable)
				.set(body)
				.where(eq(schema.usersSettingsTable.user_id, id))
				.returning({ user_id: schema.usersSettingsTable.user_id });
			if (!settings) return null;
			return settings[0].user_id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Verifies a user by id
	 * @param {string} id - The id of the user
	 * @returns {Promise<string | null | Error>} - Returns the userID or null if an error occurs or no settings are found
	 */
	async setVerification(id: string, bool: boolean): Promise<string | null | Error> {
		try {
			const settings = await this.db
				.update(schema.usersSettingsTable)
				.set({ is_verified: bool })
				.where(eq(schema.usersSettingsTable.user_id, id))
				.returning({ user_id: schema.usersSettingsTable.user_id });
			if (!settings) return null;
			return settings[0].user_id;
		} catch (error) {
			return error;
		}
	}
}
