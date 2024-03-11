import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { InsertQuiz } from 'src/Utils/Types/model.types';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import {
	usersBillingInformationTable,
	usersSettingsTable,
	usersStatisticsTable,
	usersTable,
	usersTimestampsTable
} from '../Models/_index';

const DB_URL = env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
	connectionString: DB_URL,
});

const db = drizzle(client, { schema });

const usersToInsert = [
	{
		first_name: 'John',
		last_name: 'Doe',
		email: 'test@mail.com',
		password: 'password',
	},
	{
		first_name: 'Jane',
		last_name: 'Doe',
		email: 'test1@mail.com',
		password: 'password',
	},
	{
		first_name: 'John',
		last_name: 'Smith',
		email: 'test2@mail.com',
		password: 'password',
	},
];

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
			]);
		}
	} catch (err) {
		console.error(err);
	}
};

const seedQuizWithHighscores = async () => {
	try {
		console.log('Seeding quiz with highscores');

		const quiz = await db.query.quizzesTable.findFirst();
		const user = await db.query.usersTable.findFirst();

		if (quiz && user) {
			const highscore = await db.insert(schema.quizHighscoresTable).values({
				quiz_id: `${quiz.id}`,
				user_id: `${user.id}`,
				score: 100,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

/**
 * This script will insert users into the database
 *
 */
const seedUsers = async () => {
	try {
		console.log('Seeding users');

		for (const user of usersToInsert) {
			const newUser = await db.insert(usersTable).values(user).returning({ id: usersTable.id });
			const id = newUser[0].id;

			await Promise.all([
				db.insert(usersSettingsTable).values({
					user_id: id,
				}),
				db.insert(usersStatisticsTable).values({
					user_id: id,
				}),
				db.insert(usersTimestampsTable).values({
					user_id: id,
				}),
				db.insert(usersBillingInformationTable).values({
					user_id: id,
				}),
			]);
			await db
				.update(usersSettingsTable)
				.set({
					roles: 'admin',
          is_verified: true,
				})
				.where(eq(usersSettingsTable.user_id, id));
		}
	} catch (err) {
		console.error(err);
	}
};

const queryAll = async () => {
	try {
		console.log('Querying all');

		const users = await queryUsersWithAllTables();
		console.log(users);
		console.log('---------------------------------');
		const quizzes = await queryQuizzesWithAllTables();
		console.log(quizzes[0], quizzes[0].questions[0].answers);
		console.log(quizzes[0].highscores);
	} catch (err) {
		console.error(err);
	}
};

async function queryUsersWithAllTables() {
	try {
		const users = await db.query.usersTable.findMany({
			with: {
				billing_information: true,
				statistics: true,
				settings: true,
				timestamps: true,
			},
		});
		return users;
	} catch (err) {
		console.error(err);
	}
}

async function queryQuizzesWithAllTables() {
	try {
		const quizzes = await db.query.quizzesTable.findMany({
			with: {
				highscores: true,
				questions: true,
			},
		});
		return quizzes;
	} catch (err) {
		console.error(err);
	}
}

async function main() {
	await client.connect();
	await seedUsers();
	await seedQuizzes();
	await seedQuizWithHighscores();
	await queryAll();
	await client.end();
}
main();
