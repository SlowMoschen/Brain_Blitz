export interface PersonalRankings {
	quiz_id: string;
	highscore_id: string;
	quiz_name: string;
	quiz_category: string;
	points: number;
	position: number;
}

export interface MostPlayedQuizzes {
	quiz_id: string;
	quiz_name: string;
	times_played: number;
}

export interface MostPlaytime {
	userID: string;
	first_name: string;
	playtime: number;
}

export interface MostPoints {
	userID: string;
	first_name: string;
	points: number;
}

export interface QuizRankings {
	id: string;
	user_id: string;
	quiz_id: string;
	first_name: string;
	quiz_name: string;
	points: number;
	created_at: Date;
}
