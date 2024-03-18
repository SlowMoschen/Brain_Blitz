import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from '../../../../../Models/_index';
import { SelectUserTimestamps } from "src/Utils/Types/model.types";
import { eq } from "drizzle-orm";
import { TimestampColumns } from "src/Enums/timestampColumns.enum";

@Injectable()
export class TimestampsRepository {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Queries the database for all timestamps
     * @returns {Promise<SelectUserTimestamps[] | Error>} - Returns all timestamps or an empty array if no timestamps are found and an error if an error occurs
     */
    async findAll(): Promise<SelectUserTimestamps[] | Error> {
        try {
            return await this.db.select().from(schema.usersTimestampsTable);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a timestamps by id
     * @param id - The id of the timestamps
     * @returns {Promise<SelectUserTimestamps | Error>} - Returns a timestamps or an empty array if no timestamps are found and an error if an error occurs
     */
    async findByID(id: string): Promise<SelectUserTimestamps | Error> {
        try {
            return await this.db.query.usersTimestampsTable.findFirst({
                where: eq(schema.usersTimestampsTable.user_id, id)
            });
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Inserts a new timestamps into the database
     * @param {string} id - The id of the user
     * @returns {Promise<string | Error>} - Returns the id of the user or null if an error occurs
     */
    async insertDefaultTable(id: string): Promise<string | Error> {
        try {
            const timestamps = await this.db
                .insert(schema.usersTimestampsTable)
                .values({ user_id: id })
                .returning({ user_id: schema.usersTimestampsTable.user_id });
            return timestamps[0].user_id;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a specific column in the user timestamps table and sets the value to the current date
     * @param {string} userID - The id of the user
     * @param {TimestampColumns} column - The column to update
     * @returns {Promise<string | Error>} - Returns the id of the user or null if an error occurs
     */
    async updateOneColumn(userID: string, column: TimestampColumns): Promise<string | Error>{
        try {
            const timestamps = await this.db
                .update(schema.usersTimestampsTable)
                .set({ [column]: new Date() })
                .where(eq(schema.usersTimestampsTable.user_id, userID))
                .returning({ user_id: schema.usersTimestampsTable.user_id });
            return timestamps[0].user_id;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Deletes a user by id
     * @param {string} id - The id of the user
     * @returns {Promise<string | Error>} - Returns the id of the deleted user or null if an error occurs
     */
    async deleteOne(id: string): Promise<string | Error> {
        try {
            const timestamps = await this.db
                .delete(schema.usersTimestampsTable)
                .where(eq(schema.usersTimestampsTable.user_id, id))
                .returning({ user_id: schema.usersTimestampsTable.user_id });
            return timestamps[0].user_id;
        } catch (error) {
            return error;
        }
    }
}