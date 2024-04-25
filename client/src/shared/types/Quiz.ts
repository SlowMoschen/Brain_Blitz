
export interface IQuizStatistics {
    uniqueCategories: number;
    totalQuestions: number;
    totalQuizzes: number;
    categoryStats: {
      category: string;
      totalQuestions: number;
      totalQuizzes: number;
    }[];
    timesPlayed: {
      title: string;
      times_played: number;
    }[];
  }

export interface IQuiz {
    id: string;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    category: string;
    highscores: IHighscore[];
    questions: IQuestion[];
}

export interface IQuestion {
    id: string;
    quiz_id: string;
    question: string;
    answers: string[];
    correct_answer: string;
    created_at: string;
    updated_at: string;
}

export interface IHighscore {
    id: string;
    quiz_id: string;
    user_id: string;
    score: number;
    created_at: string;
    updated_at: string;
}