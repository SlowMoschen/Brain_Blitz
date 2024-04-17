import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import { seedQuizzes } from './QuizSeed';
import { clearDB } from './clear';

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

const adminUser = {
	first_name: 'Admin',
	last_name: 'User',
	password: 'admin',
	email: 'admin@test.com',
};

/**
 * MARK: Main
 * This is the main function that will run the seeding scripts
 */
const main = async () => {
	try {
		await client.connect();
		await clearDB(db);
		await seedQuizzes(db);
		// await generateUser(db);
		await client.end();
	} catch (err) {
		console.error(err);
	}
};
main();
