import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { SelectQuizHighscore } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';
import { and, eq } from 'drizzle-orm';
import { CreateHighscoreDTO } from 'src/Modules/quizzes/dto/create-highscore.dto';
import { UserRepository } from '../User/_user.repository';

@Injectable()
export class HighscoreRepository {
	constructor(
		@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>,
		private readonly userRepository: UserRepository,
	) {}

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
	async findOne(id: string): Promise<SelectQuizHighscore | Error> {
		try {
			return await this.db.query.quizHighscoresTable.findFirst({ where: eq(schema.quizHighscoresTable.id, id) });
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description Insert one highscore
	 * @param {CreateHighscoreDTO} highscore
	 * @returns {Promise<string | Error>} - id of created highscore
	 */
	async insertOne(highscore: CreateHighscoreDTO): Promise<string | Error> {
		try {

            const existingHighscore = await this.db.query.quizHighscoresTable.findFirst({
                where: and(eq(schema.quizHighscoresTable.user_id, highscore.user_id), eq(schema.quizHighscoresTable.quiz_id, highscore.quiz_id))
            })

            // If user already has a highscore for this quiz, check if new highscore is higher and delete old highscore
            if (existingHighscore) {
                if (existingHighscore.score < highscore.score) this.deleteOne(existingHighscore.id);
            }

			const createdHighscoreID =  await this.db
				.insert(schema.quizHighscoresTable)
				.values(highscore)
				.returning({ id: schema.quizHighscoresTable.id })[0].id;

            // Insert new highscore junction reference into user_highscores
            await this.userRepository.insertNewHighscore(highscore.user_id, createdHighscoreID);

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
