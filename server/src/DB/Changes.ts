import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { env } from '../Configs/env.config';
import * as schema from '../Models/_index';
import { SelectQuiz } from 'src/Utils/Types/model.types';
import { eq } from 'drizzle-orm';

const DB_URL = env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DATABASE_DEV_URL;

const client = new Client({
	connectionString: DB_URL,
});

const db = drizzle(client, { schema });

const lowerCaseQuizCategories = async () => {
	console.log('-------------------- Lowercasing quiz categories --------------------');
	const quizzes: SelectQuiz[] = await db.query.quizzesTable.findMany({ with: { questions: true, highscores: true } });
	for (const quiz of quizzes) {
		console.log(quiz.title, `Category: ${quiz.category} -> ${quiz.category.toLowerCase()}`);
		    await db
			.update(schema.quizzesTable)
			.set({ category: quiz.category.toLowerCase() })
			.where(eq(schema.quizzesTable.id, quiz.id));
	}
	console.log('-------------------- Lowercasing quiz categories done --------------------');
};

const main = async () => {
	await client.connect();
	await lowerCaseQuizCategories();
	await client.end();
};
main();
