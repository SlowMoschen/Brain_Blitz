import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { InsertQuiz } from 'src/Utils/Types/model.types';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import { clearDB } from './clear';
import { generateUser } from './FakeUserSeed';
import { seedQuizzes } from './QuizSeed';

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
		await seedQuizzes(db);
		// await generateUser(db);
		await seedAdminUser();
		await client.end();
	} catch (err) {
		console.error(err);
	}
};
main();
