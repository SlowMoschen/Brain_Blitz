export type CompletedQuiz = {
	completed: boolean;
	highscore: 'created' | 'updated' | 'not updated';
	messages?: string[];
};
