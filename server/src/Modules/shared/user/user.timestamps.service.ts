import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { TimestampColumns } from 'src/Enums/timestampColumns.enum';
import * as schema from '../../../Models/_index';

@Injectable()
export class UserTimestampsService {

	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description - Queries the database for all user timestamps Rows
	 * @returns {Promise<InsertUserTimestamps[]| null>} - Returns all user timestamps or null if an error occurs or no timestamps are found
	 */
	async getUserTimestamps() {
		try {
			const timestamps = await this.db.select().from(schema.usersTimestampsTable);
			if (!timestamps) return null;
			return timestamps;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description - Queries the database for a user timestamps by id
	 * @param {string} id - The id of the user
	 * @returns {Promise<InsertUserTimestamps | null>} - Returns a user timestamps or null if an error occurs or no timestamps are found
	 */
	async getUserTimestampsById(id: string) {
		try {
			const timestamps = await this.db.query.usersTimestampsTable.findFirst({
				where: eq(schema.usersTimestampsTable.user_id, id),
			});
			if (!timestamps) return null;
			return timestamps;
		} catch (error) {
			return error;
		}
	}

    async updateUserTimestamp(userID: string, column: TimestampColumns) {
        try {
            const timestamps = await this.db
                .update(schema.usersTimestampsTable)
                .set({ [column]: new Date() })
                .where(eq(schema.usersTimestampsTable.user_id, userID))
                .returning({ user_id: schema.usersTimestampsTable.user_id });
            if (!timestamps) return null;
            return timestamps[0].user_id;
        } catch (error) {
            return error;
        }
    }
}
