import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { InsertQuiz } from 'src/Utils/Types/model.types';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import { clearDB } from './clear';

const DB_URL = env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
	connectionString: DB_URL,
});

const db = drizzle(client, { schema });

const quizzesToInsert: InsertQuiz[] = [
	{
		title: 'Quiz 1',
		description: 'This is a quiz',
		category: 'Science',
	},
	{
		title: 'Quiz 2',
		description: 'This is a quiz',
		category: 'History',
	},
	{
		title: 'Quiz 3',
		description: 'This is a quiz',
		category: 'Math',
	},
];

/**
 * This script will insert quizzes into the database
 *
 */
const seedQuizzes = async () => {
	try {
		console.log('Seeding quizzes');

		for (const quiz of quizzesToInsert) {
			console.log(`Seeding quiz ${quiz.title}`);
			const newQuiz = await db.insert(schema.quizzesTable).values(quiz).returning({ id: schema.quizzesTable.id });
			const id = newQuiz[0].id;

			await Promise.all([
				db.insert(schema.quizQuestionsTable).values({
					quiz_id: id,
					question: 'What is 1 + 1?',
					answers: ['1', '2', '3', '4'],
					correct_answer: '2',
				}),
				db.insert(schema.quizQuestionsTable).values({
					quiz_id: id,
					question: 'What is 2 + 2?',
					answers: ['1', '2', '3', '4'],
					correct_answer: '4',
				}),
			]);
		}
	} catch (err) {
		console.error(err);
	}
};

const main = async () => {
	try {
		await client.connect();
		await clearDB(db);
		await seedQuizzes();
		await client.end();
	} catch (err) {
		console.error(err);
	}
}
main();