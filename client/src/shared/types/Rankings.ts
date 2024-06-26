export interface IPersonalRanking {
  highscore_id: string;
  points: number;
  position: number;
  quiz_id: string;
  quiz_name: string;
  quiz_category: string;
}

export interface IGlobalRanking {
    name: string;
    value : number;
    id: string;
}

export interface IPointsRanking {
    first_name: string;
    points: number;
    userID: string;
}

export interface IPlaytimeRanking {
    first_name: string;
    playtime: number;
    userID: string;
}

export interface IMostPlayedQuizRanking {
    quiz_name: string;
    times_played: number;
    quiz_id: string;
}

export interface IQuizRanking {
    quiz_id: string;
    quiz_name: string;
    user_id: string;
    points: number;
    first_name: string;
    id: string;
    created_at: string;
}