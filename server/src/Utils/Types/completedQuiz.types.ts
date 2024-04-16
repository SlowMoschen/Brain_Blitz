export type CompletedQuiz = {
	completed: boolean;
	highscore: 'created' | 'updated' | 'not updated' | 'not created' ;
	messages?: string[];
};
