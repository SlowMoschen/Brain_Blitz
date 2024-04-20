import * as schema from '../Models/_index';
import { biologyQuizzes } from './quizzes/biology';
import { filmQuizzes } from './quizzes/film';
import { geographyQuizzes } from './quizzes/geography';
import { historyQuizzes } from './quizzes/history';
import { musicQuizzes } from './quizzes/music';
import { politicsQuizzes } from './quizzes/politics';
import { sportsQuizzes } from './quizzes/sports';
import { technologyQuizzes } from './quizzes/technology';
import { tvQuizzes } from './quizzes/tv';
import { videogameQuizzes } from './quizzes/videogames';

const quizzesToInsert = [
	...historyQuizzes,
	...technologyQuizzes,
	...geographyQuizzes,
	...biologyQuizzes,
	...politicsQuizzes,
	...sportsQuizzes,
	...filmQuizzes,
	...tvQuizzes,
	...videogameQuizzes,
	...musicQuizzes
];

const seedQuizzes = async (db: any) => {
	for (const quiz of quizzesToInsert) {
		const { questions, ...quizData } = quiz;
		const quizID = await db.insert(schema.quizzesTable).values(quizData).returning({ id: schema.quizzesTable.id });
		const { id } = quizID[0];

		console.log(`----------------- Quiz ${id} created -----------------`);
		console.log(`----------------- Category: ${quizData.category} -----------------`);

		for (const question of questions) {
			const shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);
			const questionData = {
				quiz_id: id,
				...question,
				answers: shuffledAnswers,
			};
			const questionID = await db
				.insert(schema.quizQuestionsTable)
				.values(questionData)
				.returning({ id: schema.quizQuestionsTable.id });
		}

		console.log(`----------------- Questions inserted -----------------`);
	}
};

export { seedQuizzes };
