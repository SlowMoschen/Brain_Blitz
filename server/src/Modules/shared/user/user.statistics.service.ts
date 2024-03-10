import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { InjectDatabase } from "src/Decorators/injectDatabase.decorator";
import * as schema from "src/Models/_index";
import { SelectUserStatistics } from "src/Utils/Types/model.types";
import { UpdateUserStatisticsDTO } from "src/Modules/users/dto/update-user-statistics.dto";

@Injectable()
export class StatisticsService {
    constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}


    /**
     * @description - Queries the database for all user statistics Rows
     * @returns {Promise<SelectUserStatistics[]| null>} - Returns all user statistics or null if an error occurs or no statistics are found
     */
    async getUserStatistics(): Promise<SelectUserStatistics[] | null> {
        try {
            const stats = await this.db.select().from(schema.usersStatisticsTable);
            if (!stats) return null;
            return stats;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Queries the database for a user statistics by id
     * @param {string} id - The id of the user
     * @returns {Promise<SelectUserStatistics | null>} - Returns a user statistics or null if an error occurs or no statistics are found
     */ 
    async getUserStatisticsById(id: string): Promise<SelectUserStatistics | null> {
        try {
            const stats = await this.db.query.usersStatisticsTable.findFirst({
                where: eq(schema.usersStatisticsTable.user_id, id),
            });
            if (!stats) return null;
            return stats;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description - Updates a user statistics by id
     * @param {string} id - The id of the user
     * @param {UpdateUserStatisticsDTO} body - The body of the request
     * @returns {Promise<string | null>} - Returns the userID or null if an error occurs or no statistics are found
     */
    async updateUserStatistics(id: string, body: UpdateUserStatisticsDTO): Promise<string | null | Error>{
        try {
            const stats = await this.db
                .update(schema.usersStatisticsTable)
                .set(body)
                .where(eq(schema.usersStatisticsTable.user_id, id))
                .returning({ user_id: schema.usersStatisticsTable.user_id });
            if (!stats) return null;
            return stats[0].user_id;
        } catch (error) {
            return error;
        }
    }
}