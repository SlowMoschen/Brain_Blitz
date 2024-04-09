import { Injectable, NotFoundException } from '@nestjs/common';
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
	 * @returns {Promise<SelectQuiz[]>}
	 */
	async findAll(): Promise<SelectQuiz[]> {
		const quizzes = await this.db.query.quizzesTable.findMany({ with: { questions: true, highscores: true } });
		if (quizzes instanceof Error) throw quizzes;
		if (quizzes.length === 0) throw new NotFoundException('No quizzes found');
		return quizzes;
	}

	/**
	 * @description Find one quiz by ID
	 * @param {string} id
	 * @returns {Promise<SelectQuiz>}
	 */
	async findOne(id: string): Promise<SelectQuiz> {
		const quiz = await this.db.query.quizzesTable.findFirst({
			where: eq(schema.quizzesTable.id, id),
			with: { questions: true, highscores: true },
		});
		if (quiz instanceof Error) throw quiz;
		if (!quiz) throw new NotFoundException('Quiz not found');
		return quiz;
	}

	/**
	 * @description Find one question by ID
	 * @param {string} id
	 * @returns {Promise<SelectQuizQuestion>}
	 */
	async findOneQuestion(id: string): Promise<SelectQuizQuestion> {
		const question = await this.db.query.quizQuestionsTable.findFirst({
			where: eq(schema.quizQuestionsTable.id, id),
		});
		if (question instanceof Error) throw question;
		if (!question) throw new NotFoundException('Question not found');
		return question;
	}

	/**
	 * @description Find quizzes by category
	 * @param {string} category
	 * @returns {Promise<SelectQuiz[]>}
	 */
	async findByCategory(category: string): Promise<SelectQuiz[]> {
		const quizzes = await this.db.query.quizzesTable.findMany({
			where: eq(schema.quizzesTable.category, category),
			with: { questions: true, highscores: true },
		});
		if (quizzes instanceof Error) throw quizzes;
		if (quizzes.length === 0) throw new NotFoundException('No quizzes found');
		return quizzes;
	}

	/**
	 * @description create a new quiz with questions
	 * @param {CreateQuizDTO} quiz
	 * @returns {Promise<string>}
	 */
	async insertOne(quiz: CreateQuizDTO): Promise<string> {
		const { questions, ...rest } = quiz;
		const newQuiz = await this.db.insert(schema.quizzesTable).values(rest).returning({ id: schema.quizzesTable.id });
		if (questions.length > 0) {
			for (const question of questions) {
				await this.insertOneQuestion(newQuiz[0].id, question);
			}
		}
		return newQuiz[0].id;
	}

	/**
	 * @description create a new question
	 * @param {string} quiz_id
	 * @param {CreateQuestionDTO} question
	 * @returns {Promise<string>}
	 */
	async insertOneQuestion(quiz_id: string, question: CreateQuestionDTO): Promise<string> {
		const newQuestion = await this.db
			.insert(schema.quizQuestionsTable)
			.values({ quiz_id, ...question })
			.returning({ id: schema.quizQuestionsTable.id });
		return newQuestion[0].id;
	}

	/**
	 * @description update a quiz
	 * @param {string} id
	 * @param {UpdateQuizDTO} quiz
	 * @returns {Promise<string>}
	 */
	async updateOne(id: string, quiz: UpdateQuizDTO): Promise<string> {
		console.log(id, quiz);
		const { questions, ...rest } = quiz;
		const updatedQuiz = await this.db
			.update(schema.quizzesTable)
			.set(rest)
			.where(eq(schema.quizzesTable.id, id))
			.returning({ id: schema.quizzesTable.id });
		if (questions && questions.length > 0) {
			for (const question of questions) {
				if (question.id) {
					await this.updateOneQuestion(question.id, question);
				} else {
					await this.insertOneQuestion(id, question);
				}
			}
		}
		return updatedQuiz[0].id;
	}

	/**
	 * @description update a question
	 * @param {string} id
	 * @param {CreateQuestionDTO} question
	 * @returns {Promise<string>}
	 */
	async updateOneQuestion(id: string, question: UpdateQuestionDTO): Promise<string> {
		const updatedQuestion = await this.db
			.update(schema.quizQuestionsTable)
			.set(question)
			.where(eq(schema.quizQuestionsTable.id, id))
			.returning({ id: schema.quizQuestionsTable.id });
		return updatedQuestion[0].id;
	}

	/**
	 * @description delete a quiz
	 * @param {string} id
	 * @returns {Promise<string>}
	 */
	async deleteOne(id: string): Promise<string> {
		const deletedQuiz = await this.db
			.delete(schema.quizzesTable)
			.where(eq(schema.quizzesTable.id, id))
			.returning({ id: schema.quizzesTable.id });
		return deletedQuiz[0].id;
	}

	/**
	 * @description delete a question
	 * @param {string} id
	 * @returns {Promise<string>}
	 */
	async deleteOneQuestion(id: string): Promise<string> {
		const deletedQuestion = await this.db
			.delete(schema.quizQuestionsTable)
			.where(eq(schema.quizQuestionsTable.id, id))
			.returning({ id: schema.quizQuestionsTable.id });
		return deletedQuestion[0].id;
	}
}
