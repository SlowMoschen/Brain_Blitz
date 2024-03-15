import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from '../../../../../Models/_index';
import { SelectUserSettings } from "src/Utils/Types/model.types";
import { eq } from "drizzle-orm";

@Injectable()
export class SettingsRepository {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Queries the database for all settings
     * @returns {Promise<SelectUserSettings[] | Error>} - Returns all settings or an empty array if no settings are found and an error if an error occurs
     */
    async findAll(): Promise<SelectUserSettings[] | Error> {
        try {
            return await this.db.select().from(schema.usersSettingsTable);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a settings by id
     * @param id - The id of the settings
     * @returns {Promise<SelectUserSettings | Error>} - Returns a settings or an empty array if no settings are found and an error if an error occurs
     */
    async findByID(id: string): Promise<SelectUserSettings | Error> {
        try {
            return await this.db.query.usersSettingsTable.findFirst({
                where: eq(schema.usersSettingsTable.user_id, id)
            });
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Inserts a new settings into the database
     * @param {string} id - The id of the user
     * @returns {Promise<string | Error>} - Returns the id of the user or null if an error occurs
     */
    async insertDefaultTable(id: string): Promise<string | Error> {
        try {
            const settings = await this.db
                .insert(schema.usersSettingsTable)
                .values({ user_id: id })
                .returning({ user_id: schema.usersSettingsTable.user_id });
            return settings[0].user_id;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a settings by id
     * @param id - The id of the settings
     * @param body - The body of the request
     * @returns {Promise<string | Error>} - Returns the userID or an empty array if no settings are found and an error if an error occurs
     */
    async updateOne(id: string, body: any): Promise<string | Error> {
        try {
            const settings = await this.db
                .update(schema.usersSettingsTable)
                .set(body)
                .where(eq(schema.usersSettingsTable.user_id, id))
                .returning({ user_id: schema.usersSettingsTable.user_id });
            return settings[0].user_id;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Deletes a settings by id
     * @param id - The id of the settings
     * @returns {Promise<string | Error>} - Returns the id of the deleted settings or null if an error occurs
     */
    async deleteOne(id: string): Promise<string | Error> {
        try {
            const settings = await this.db
                .delete(schema.usersSettingsTable)
                .where(eq(schema.usersSettingsTable.user_id, id))
                .returning({ user_id: schema.usersSettingsTable.user_id });
            return settings[0].user_id;
        } catch (error) {
            return error;
        }
    }
}