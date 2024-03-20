import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { SelectUserSettings } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';

@Injectable()
export class SettingsRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description - Queries the database for all settings
	 * @returns {Promise<SelectUserSettings[]>} - Returns all settings or an empty array if no settings are found and an error if an error occurs
	 */
	async findAll(): Promise<SelectUserSettings[]> {
		const settings = await this.db.select().from(schema.usersSettingsTable);
		if (settings instanceof Error) throw settings;
		if (settings.length === 0) throw new NotFoundException('No settings found');
		return settings;
	}

	/**
	 * @description - Queries the database for a settings by id
	 * @param id - The id of the settings
	 * @returns {Promise<SelectUserSettings>} - Returns a settings or an empty array if no settings are found and an error if an error occurs
	 */
	async findByID(id: string): Promise<SelectUserSettings> {
		const settings = await this.db.query.usersSettingsTable.findFirst({
			where: eq(schema.usersSettingsTable.user_id, id),
		});
		if (settings instanceof Error) throw settings;
		if (!settings) throw new NotFoundException('No settings found');
		return settings;
	}

	/**
	 * @description - Inserts a new settings into the database
	 * @param {string} id - The id of the user
	 * @returns {Promise<string>} - Returns the id of the user or null if an error occurs
	 */
	async insertDefaultTable(id: string): Promise<string> {
		const settings = await this.db
			.insert(schema.usersSettingsTable)
			.values({ user_id: id })
			.returning({ user_id: schema.usersSettingsTable.user_id });
		if (settings instanceof Error) throw settings;
		if (!settings[0]) throw new NotFoundException('No settings found');
		return settings[0].user_id;
	}

	/**
	 * @description - Updates a settings by id
	 * @param id - The id of the settings
	 * @param body - The body of the request
	 * @returns {Promise<string>} - Returns the userID or an empty array if no settings are found and an error if an error occurs
	 */
	async updateOne(id: string, body: any): Promise<string> {
		const updatedSettings = await this.db
			.update(schema.usersSettingsTable)
			.set(body)
			.where(eq(schema.usersSettingsTable.user_id, id))
			.returning({ user_id: schema.usersSettingsTable.user_id });
		if (updatedSettings instanceof Error) throw updatedSettings;
		if (!updatedSettings[0]) throw new NotFoundException('No settings found');

		return updatedSettings[0].user_id;
	}

	/**
	 * @description - Deletes a settings by id
	 * @param id - The id of the settings
	 * @returns {Promise<string>} - Returns the id of the deleted settings or null if an error occurs
	 */
	async deleteOne(id: string): Promise<string> {
		const deletedSettings = await this.db
			.delete(schema.usersSettingsTable)
			.where(eq(schema.usersSettingsTable.user_id, id))
			.returning({ user_id: schema.usersSettingsTable.user_id });
		if (deletedSettings instanceof Error) throw deletedSettings;
		if (!deletedSettings[0]) throw new NotFoundException('No settings found');

		return deletedSettings[0].user_id;
	}
}
