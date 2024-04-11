import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { CreateHighscoreDTO } from 'src/Modules/quizzes/dto/create-highscore.dto';
import { SelectQuizHighscore, SelectQuizHighscoreWithQuizAndUser } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';

@Injectable()
export class HighscoreRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description Find all highscores
	 * @returns {Promise<SelectQuizHighscore[]>}
	 */

	async findAll(): Promise<SelectQuizHighscore[]> {
		const highscores = await this.db.select().from(schema.quizHighscoresTable);
		if (highscores instanceof Error) throw highscores;
		if (highscores.length === 0) throw new NotFoundException('No highscores found');
		return highscores;
	}

	/**
	 * @description Find highscore by id
	 * @param {string} id
	 * @returns {Promise<SelectQuizHighscore>}
	 */
	async findOne(userID: string, quizID: string): Promise<SelectQuizHighscore> {
		const highscore = await this.db.query.quizHighscoresTable.findFirst({
			where: and(eq(schema.quizHighscoresTable.user_id, userID), eq(schema.quizHighscoresTable.quiz_id, quizID)),
		});
		if (highscore instanceof Error) throw highscore;
		return highscore;
	}

	/**
	 * @description Find highscores by user
	 * @param {string} userID
	 * @returns {Promise<SelectQuizHighscore[]>}
	 */
	async findAllByUser(userID: string): Promise<SelectQuizHighscore[]> {
		const highscores = await this.db.query.quizHighscoresTable.findMany({
			where: eq(schema.quizHighscoresTable.user_id, userID),
		});
		if (highscores instanceof Error) throw highscores;
		if (highscores.length === 0) throw new NotFoundException('No highscores found');
		return highscores;
	}

	/**
	 * @description Find highscores by quiz
	 * @param {string} quizID
	 * @returns {Promise<SelectQuizHighscore[]>}
	 */
	async findAllByQuiz(quizID: string): Promise<SelectQuizHighscoreWithQuizAndUser[]> {
		const highscores = await this.db.query.quizHighscoresTable.findMany({
			where: eq(schema.quizHighscoresTable.quiz_id, quizID),
			with: { quiz: true, user: true },
		});
		if (highscores instanceof Error) throw highscores;
		if (highscores.length === 0) throw new NotFoundException('No highscores found');
		return highscores;
	}

	/**
	 * @description Insert one highscore
	 * @param {CreateHighscoreDTO} createHighscoreDTO
	 * @returns {Promise<string>} - id of created highscore
	 */
	async insertOne(createHighscoreDTO: CreateHighscoreDTO): Promise<string> {
		const highscore = await this.db
			.insert(schema.quizHighscoresTable)
			.values(createHighscoreDTO)
			.returning({ id: schema.quizHighscoresTable.id });
		if (highscore instanceof Error) throw highscore;
		if (!highscore[0]) throw new NotImplementedException('Could not create highscore');
		return highscore[0].id;
	}

	/**
	 * @description Delete one highscore
	 * @param id - highscore id
	 * @returns {Promise<string>} - id of deleted highscore
	 */
	async deleteOne(id: string): Promise<string> {
		const highscore = await this.db
			.delete(schema.quizHighscoresTable)
			.where(eq(schema.quizHighscoresTable.id, id))
			.returning({ id: schema.quizHighscoresTable.id });
		if (highscore instanceof Error) throw highscore;
		if (!highscore[0]) throw new NotFoundException('No highscore found');
		return highscore[0].id;
	}
}
