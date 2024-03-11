import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from '../../../../../Models/_index';
import { SelectUserStatistics } from "src/Utils/Types/model.types";
import { eq } from "drizzle-orm";

@Injectable()
export class StatisticsRepository {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

    /**
     * @description - Queries the database for all statistics
     * @returns {Promise<SelectUserStatistics[] | [] | Error>} - Returns all statistics or an empty array if no statistics are found and an error if an error occurs
     */
    async queryAllStatistics(): Promise<SelectUserStatistics[] | [] | Error> {
        try {
            return await this.db.select().from(schema.usersStatisticsTable);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a statistics by id
     * @param id - The id of the statistics
     * @returns {Promise<SelectUserStatistics | [] | Error>} - Returns a statistics or an empty array if no statistics are found and an error if an error occurs
     */
    async queryStatisticsById(id: string): Promise<SelectUserStatistics | [] | Error> {
        try {
            return await this.db.query.usersStatisticsTable.findFirst({
                where: eq(schema.usersStatisticsTable.user_id, id)
            });
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Inserts a new statistics into the database
     * @param {string} id - The id of the user
     * @returns {Promise<string | [] | Error>} - Returns the id of the user or null if an error occurs
     */
    async insertDefaultTable(id: string): Promise<string | [] | Error> {
        try {
            const statistics = await this.db
                .insert(schema.usersStatisticsTable)
                .values({ user_id: id })
                .returning({ user_id: schema.usersStatisticsTable.user_id });
            return statistics ? statistics[0].user_id : [];
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a statistics by id
     * @param id - The id of the statistics
     * @param body - The body of the request
     * @returns {Promise<string | [] | Error>} - Returns the userID or an empty array if no statistics are found and an error if an error occurs
     */
    async updateStatistics(id: string, body: any): Promise<string | [] | Error> {
        try {
            const statistics = await this.db
                .update(schema.usersStatisticsTable)
                .set(body)
                .where(eq(schema.usersStatisticsTable.user_id, id))
                .returning({ user_id: schema.usersStatisticsTable.user_id });
            return statistics ? statistics[0].user_id : [];
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Deletes a statistics by id
     * @param id - The id of the statistics
     * @returns {Promise<string | [] | Error>} - Returns the id of the deleted statistics or null if an error occurs
     */
    async deleteStatisticsById(id: string): Promise<string | [] | Error> {
        try {
            await this.db.delete(schema.usersStatisticsTable).where(eq(schema.usersStatisticsTable.user_id, id));
            return id;
        } catch (error) {
            return error;
        }
    }
}