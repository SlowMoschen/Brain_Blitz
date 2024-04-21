import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import { seedQuizzes } from './QuizSeed';
import { clearDB } from './clear';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

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
	password: process.env.ADMIN_PW,
	email: 'admin@test.com',
};

const seedAdmin = async (db: any) => {
	console.log('-------------------- Seeding Admin User --------------------');
	const hashedPassword = await bcrypt.hash(adminUser.password, 10);
	const user = await db
		.insert(schema.usersTable)
		.values({ ...adminUser, password: hashedPassword })
		.returning({ id: schema.usersTable.id });
	const { id } = user[0];

	await db.insert(schema.usersSettingsTable).values({ user_id: id });
	await db
		.update(schema.usersSettingsTable)
		.set({ roles: 'admin', is_verified: true })
		.where(eq(schema.usersSettingsTable.user_id, id));

	await db.insert(schema.usersStatisticsTable).values({ user_id: id });
	await db.insert(schema.usersTimestampsTable).values({ user_id: id });
	await db.insert(schema.usersBillingInformationTable).values({ user_id: id });
	console.log(`----------------- Admin User ${id} created -----------------`);
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
		await seedAdmin(db);
		await client.end();
	} catch (err) {
		console.error(err);
	}
};
main();
