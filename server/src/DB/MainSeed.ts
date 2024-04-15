import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { InsertQuiz } from 'src/Utils/Types/model.types';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import { clearDB } from './clear';
import { generateUser } from './FakeUserSeed';


/**
 * This script is responsible for seeding the db with Mock data
 * - it clear the db
 * - it will insert 10 Mock Quizzes with the same questions and answers
 * - it will insert an admin user
 */

const DB_URL = env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
	connectionString: DB_URL,
});

const db = drizzle(client, { schema });

// MARK: Mock Data
const quizzesToInsert: InsertQuiz[] = [
	{
		title: 'Quiz 1',
		description: 'This is a quiz',
		category: 'science',
	},
	{
		title: 'Quiz 2',
		description: 'This is a quiz',
		category: 'history',
	},
	{
		title: 'Quiz 3',
		description: 'This is a quiz',
		category: 'math',
	},
	{
		title: 'Quiz 4',
		description: 'This is a quiz',
		category: 'science',
	},
	{
		title: 'Quiz 5',
		description: 'This is a quiz',
		category: 'history',
	},
	{
		title: 'Quiz 6',
		description: 'This is a quiz',
		category: 'math',
	},
	{
		title: 'Quiz 7',
		description: 'This is a quiz',
		category: 'science',
	},
	{
		title: 'Quiz 8',
		description: 'This is a quiz',
		category: 'history',
	},
	{
		title: 'Quiz 9',
		description: 'This is a quiz',
		category: 'math',
	},
	{
		title: 'Quiz 10',
		description: 'This is a quiz',
		category: 'science',
	},
];

const adminUser = {
	first_name: 'Admin',
	last_name: 'User',
	password: 'admin',
	email: 'admin@test.com',
};

/**
 * MARK: Seed Quizzes
 * This script will insert quizzes into the database
 */
const seedQuizzes = async (): Promise<string> => {
	try {
		console.log('Seeding quizzes');
		let quizID = '';

		for (const quiz of quizzesToInsert) {
			console.log(`Seeding quiz ${quiz.title}`);
			const newQuiz = await db.insert(schema.quizzesTable).values(quiz).returning({ id: schema.quizzesTable.id });
			const id = newQuiz[0].id;
			quizID = id;

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

		return quizID;
	} catch (err) {
		console.error(err);
	}
};

/**
 * MARK: Seed Admin User
 * This script will insert an admin user into the database
 */
const seedAdminUser = async () => {
	try {
		console.log('Seeding admin user');
		const hashedPassword = await bcrypt.hash(adminUser.password, 10);
		
		const user = await db
			.insert(schema.usersTable)
			.values({
				...adminUser,
				password: hashedPassword,
			})
			.returning({ id: schema.usersTable.id });
		const userId = user[0].id;

		await db.insert(schema.usersSettingsTable).values({
			user_id: userId,
			roles: 'admin',
			is_verified: true,
		});

		await db.insert(schema.usersStatisticsTable).values({
			user_id: userId,
		});

		await db.insert(schema.usersBillingInformationTable).values({
			user_id: userId,
		});

		await db.insert(schema.usersTimestampsTable).values({
			user_id: userId,
		});
	} catch (err) {
		console.error(err);
	}
};

/**
 * MARK: Main
 * This is the main function that will run the seeding scripts
 */
const main = async () => {
	try {
		await client.connect();
		await clearDB(db);
		const lastQuizID = await seedQuizzes();
		await generateUser(db, lastQuizID);
		await seedAdminUser();
		await client.end();
	} catch (err) {
		console.error(err);
	}
};
main();
