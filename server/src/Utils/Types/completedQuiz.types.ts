export type CompletedQuiz = {
	completed: boolean;
	newQuiz: string | null;
	highscore: 'created' | 'updated';
};
