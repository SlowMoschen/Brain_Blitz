import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { SelectUserStatistics } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';

@Injectable()
export class StatisticsRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description - Queries the database for all statistics
	 * @returns {Promise<SelectUserStatistics[]>} - Returns all statistics or an empty array if no statistics are found and an error if an error occurs
	 */
	async findAll(): Promise<SelectUserStatistics[]> {
		const statistics = await this.db.select().from(schema.usersStatisticsTable);
		if (statistics instanceof Error) throw statistics;
		if (statistics.length === 0) throw new NotFoundException('No statistics found');
		return statistics;
	}

	/**
	 * @description - Queries the database for a statistics by id
	 * @param id - The id of the statistics
	 * @returns {Promise<SelectUserStatistics>} - Returns a statistics or an empty array if no statistics are found and an error if an error occurs
	 */
	async findByID(id: string): Promise<SelectUserStatistics> {
		const statistics = await this.db.query.usersStatisticsTable.findFirst({
			where: eq(schema.usersStatisticsTable.user_id, id),
		});
		if (statistics instanceof Error) throw statistics;
		if (!statistics) throw new NotFoundException('No statistics found');
		return statistics;
	}

	/**
	 * @description - Inserts a new statistics into the database
	 * @param {string} id - The id of the user
	 * @returns {Promise<string>} - Returns the id of the user or null if an error occurs
	 */
	async insertDefaultTable(id: string): Promise<string> {
		const statistics = await this.db
			.insert(schema.usersStatisticsTable)
			.values({ user_id: id })
			.returning({ user_id: schema.usersStatisticsTable.user_id });
		if (statistics instanceof Error) throw statistics;
		if (!statistics[0]) throw new NotFoundException('No statistics found');
		return statistics[0].user_id;
	}

	/**
	 * @description - Updates a statistics by id
	 * @param id - The id of the statistics
	 * @param body - The body of the request
	 * @returns {Promise<string>} - Returns the userID or an empty array if no statistics are found and an error if an error occurs
	 */
	async updateOne(id: string, body: any): Promise<string> {
		const updatedStatistics = await this.db
			.update(schema.usersStatisticsTable)
			.set(body)
			.where(eq(schema.usersStatisticsTable.user_id, id))
			.returning({ user_id: schema.usersStatisticsTable.user_id });
		if (updatedStatistics instanceof Error) throw updatedStatistics;
		if (!updatedStatistics[0]) throw new NotFoundException('No statistics found');

		return updatedStatistics[0].user_id;
	}

	/**
	 * @description - Deletes a statistics by id
	 * @param id - The id of the statistics
	 * @returns {Promise<string>} - Returns the id of the deleted statistics or null if an error occurs
	 */
	async deleteOne(id: string): Promise<string> {
		const deletedStatistics = await this.db
			.delete(schema.usersStatisticsTable)
			.where(eq(schema.usersStatisticsTable.user_id, id))
			.returning({ user_id: schema.usersStatisticsTable.user_id });
		if (deletedStatistics instanceof Error) throw deletedStatistics;
		if (!deletedStatistics[0]) throw new NotFoundException('No statistics found');

		return deletedStatistics[0].user_id;
	}
}
