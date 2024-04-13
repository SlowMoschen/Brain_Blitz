export type CompletedQuiz = {
	completed: boolean;
	highscore: 'created' | 'updated' | 'not updated';
	message?: string | string[];
};
