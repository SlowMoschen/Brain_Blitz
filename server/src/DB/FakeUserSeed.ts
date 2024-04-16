import { InsertUser } from 'src/Utils/Types/model.types';
import * as schema from '../Models/_index';
import { eq } from 'drizzle-orm';

const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);
const getRandomName = () => `${firstNames[getRandomInt(10)]} ${lastNames[getRandomInt(10)]}`;
const getRandomEmail = () => `${getRandomName().split(' ').join('.')}@example.com`;
const getRandomPassword = () => `${getRandomName().split(' ').join('')}`;

// MARK: Mock Data
const usersToInsert: InsertUser[] = Array.from({ length: 10 }, () => ({
	first_name: getRandomName(),
	last_name: getRandomName(),
	email: getRandomEmail(),
	password: getRandomPassword(),
	energy: 100,
}));

const generateMockUser = async (db: any, quizID: string) => {
	for (const user of usersToInsert) {
		const userID = await db.insert(schema.usersTable).values(user).returning({ id: schema.usersTable.id });
		const { id } = userID[0];
		await db.insert(schema.usersSettingsTable).values({ user_id: id });
		await db.insert(schema.usersStatisticsTable).values({ user_id: id });
		await db.insert(schema.usersTimestampsTable).values({ user_id: id });
		await db.insert(schema.usersBillingInformationTable).values({ user_id: id });

		console.log(`User ${id} created`);

		const highscore = {
			user_id: id,
			quiz_id: quizID,
			score: getRandomInt(Math.floor(Math.random() * (3000 - 2500 + 1) + 2500)),
		};

		const highscoreID = await db
			.insert(schema.quizHighscoresTable)
			.values(highscore)
			.returning({ id: schema.quizHighscoresTable.id });
		await db.insert(schema.highscores).values({ user_id: id, highscore_id: highscoreID[0].id });

		console.log(`Highscore ${highscoreID[0].id} created`);

		await db
			.update(schema.usersStatisticsTable)
			.set({ points: highscore.score, played_quizzes: getRandomInt(10) })
			.where(eq(schema.usersStatisticsTable.user_id, id));

            console.log(`UserStats: ${id} updated`);
	}
};

export { generateMockUser as generateUser };
