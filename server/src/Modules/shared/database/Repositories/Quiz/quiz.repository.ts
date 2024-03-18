import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDatabase } from 'src/Decorators/injectDatabase.decorator';
import { CreateQuestionDTO } from 'src/Modules/quizzes/dto/create-question.dto';
import { CreateQuizDTO } from 'src/Modules/quizzes/dto/create-quiz.dto';
import { UpdateQuizDTO } from 'src/Modules/quizzes/dto/update-quiz.dto';
import { SelectQuiz, SelectQuizQuestion } from 'src/Utils/Types/model.types';
import * as schema from '../../../../../Models/_index';
import { UpdateQuestionDTO } from 'src/Modules/quizzes/dto/update-question.dto';

@Injectable()
export class QuizRepository {
	constructor(@InjectDatabase() private readonly db: NodePgDatabase<typeof schema>) {}

	/**
	 * @description Find all quizzes
	 * @returns {Promise<SelectQuiz[] | Error>}
	 */
	async findAll(): Promise<SelectQuiz[] | Error> {
		try {
			return await this.db.query.quizzesTable.findMany({
				with: {
					questions: true,
					highscores: true,
				},
			});
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description Find one quiz by ID
	 * @param {string} id
	 * @returns {Promise<SelectQuiz | Error>}
	 */
	async findOne(id: string): Promise<SelectQuiz | Error> {
		try {
			return await this.db.query.quizzesTable.findFirst({
				where: eq(schema.quizzesTable.id, id),
				with: { questions: true, highscores: true },
			});
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description Find one question by ID
	 * @param {string} id
	 * @returns {Promise<SelectQuizQuestion | Error>}
	 */
	async findOneQuestion(id: string): Promise<SelectQuizQuestion | Error> {
		try {
			return await this.db.query.quizQuestionsTable.findFirst({
				where: eq(schema.quizQuestionsTable.id, id),
			});
		} catch (error) {
			return error;
		}
	}

    /**
     * @description Find quizzes by category
     * @param {string} category
     * @returns {Promise<SelectQuiz[] | Error>}
     */
    async findByCategory(category: string): Promise<SelectQuiz[] | Error> {
        try {
            return await this.db.query.quizzesTable.findMany({
                where: eq(schema.quizzesTable.category, category),
                with: { questions: true, highscores: true },
            });
        } catch (error) {
            return error;
        }
    }

	/**
	 * @description create a new quiz with questions
	 * @param {CreateQuizDTO} quiz
	 * @returns {Promise<string | Error>}
	 */
	async insertOne(quiz: CreateQuizDTO): Promise<string | Error> {
		try {
			const { questions, ...rest } = quiz;
			const quizID = await this.db.insert(schema.quizzesTable).values(rest).returning({ id: schema.quizzesTable.id });
			if (quizID instanceof Error) return quizID;
			for (const question of questions) {
				const insertedQuestion = await this.insertOneQuestion(quizID[0].id, question);
				if (insertedQuestion instanceof Error) return insertedQuestion;
			}
			return quizID[0].id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description create a new question
	 * @param {string} quizId
	 * @param {CreateQuestionDTO} question
	 * @returns {Promise<string | Error>}
	 */
	async insertOneQuestion(quizId: string, question: CreateQuestionDTO): Promise<string | Error> {
		try {
			return await this.db
				.insert(schema.quizQuestionsTable)
				.values({ quiz_id: quizId, ...question })
				.returning({ id: schema.quizQuestionsTable.id })[0].id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description update a quiz
	 * @param {string} id
	 * @param {UpdateQuizDTO} quiz
	 * @returns {Promise<string | Error>}
	 */
	async updateOne(id: string, quiz: UpdateQuizDTO): Promise<string | Error> {
		try {
			const { questions, ...rest } = quiz;
			const updatedQuiz = await this.db
				.update(schema.quizzesTable)
				.set(rest)
				.where(eq(schema.quizzesTable.id, id))
				.returning({ id: schema.quizzesTable.id });
			if (updatedQuiz instanceof Error) return updatedQuiz;

			if (questions.length > 0) {
				for (const question of questions) {
					const updatedQuestion = await this.updateOneQuestion(question[0].id, question);
					if (updatedQuestion instanceof Error) return updatedQuestion;
				}
			}

			return updatedQuiz[0].id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description update a question
	 * @param {string} id
	 * @param {CreateQuestionDTO} question
	 * @returns {Promise<string | Error>}
	 */
	async updateOneQuestion(id: string, question: UpdateQuestionDTO): Promise<string | Error> {
		try {
			return await this.db
				.update(schema.quizQuestionsTable)
				.set(question)
				.where(eq(schema.quizQuestionsTable.id, id))
				.returning({ id: schema.quizQuestionsTable.id })[0].id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description delete a quiz
	 * @param {string} id
	 * @returns {Promise<string | Error>}
	 */
	async deleteOne(id: string): Promise<string | Error> {
		try {
			return await this.db
				.delete(schema.quizzesTable)
				.where(eq(schema.quizzesTable.id, id))
				.returning({ id: schema.quizzesTable.id })[0].id;
		} catch (error) {
			return error;
		}
	}

	/**
	 * @description delete a question
	 * @param {string} id
	 * @returns {Promise<string | Error>}
	 */
	async deleteOneQuestion(id: string): Promise<string | Error> {
		try {
			return await this.db
				.delete(schema.quizQuestionsTable)
				.where(eq(schema.quizQuestionsTable.id, id))
				.returning({ id: schema.quizQuestionsTable.id })[0].id;
		} catch (error) {
			return error;
		}
	}
}
