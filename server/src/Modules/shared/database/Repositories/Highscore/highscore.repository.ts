import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { CreateHighscoreDTO } from 'src/Modules/quizzes/dto/create-highscore.dto';
import { SelectQuizHighscore } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';

@Injectable()
export class HighscoreRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description Find all highscores
	 * @returns {Promise<SelectQuizHighscore[] | Error>}
	 */

	async findAll(): Promise<SelectQuizHighscore[] | Error> {
		try {
			return await this.db.select().from(schema.quizHighscoresTable);
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description Find highscore by id
	 * @param {string} id
	 * @returns {Promise<SelectQuizHighscore | Error>}
	 */
	async findOne(userID: string, quizID: string): Promise<SelectQuizHighscore | Error> {
		try {
			return await this.db.query.quizHighscoresTable.findFirst({
				where: and(eq(schema.quizHighscoresTable.user_id, userID), eq(schema.quizHighscoresTable.quiz_id, quizID)),
			});
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description Insert one highscore
	 * @param {CreateHighscoreDTO} createHighscoreDTO
	 * @returns {Promise<string | Error>} - id of created highscore
	 */
	async insertOne(createHighscoreDTO: CreateHighscoreDTO): Promise<string | Error> {
		try {
			const existingHighscore = await this.findOne(createHighscoreDTO.user_id, createHighscoreDTO.quiz_id);
			if (existingHighscore instanceof Error) return existingHighscore;
			// If user already has a highscore for this quiz, check if new highscore is higher and delete old highscore
			if (existingHighscore) {
				if (existingHighscore.score < createHighscoreDTO.score) this.deleteOne(existingHighscore.id);
			}

			const createdHighscoreID = await this.db
				.insert(schema.quizHighscoresTable)
				.values(createHighscoreDTO)
				.returning({ id: schema.quizHighscoresTable.id })[0].id;

			return createdHighscoreID;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description Delete one highscore
	 * @param id - highscore id
	 * @returns {Promise<string | Error>} - id of deleted highscore
	 */
	async deleteOne(id: string): Promise<string | Error> {
		try {
			await this.db.delete(schema.quizHighscoresTable).where(eq(schema.quizHighscoresTable.id, id));
			return id;
		} catch (error) {
			return error;
		}
	}
}
