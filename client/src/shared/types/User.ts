import { IHighscore, IQuiz } from "./Quiz";

export interface UserContext {
  user: IUser;
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  energy: number;
  settings: IUserSettings;
  statistics: IUserStatistics;
  timestamps: IUserTimestamps;
  billinginfos: IUserBillinginfos;
  unlocked_quizzes: IQuizJoinTable[];
  completed_quizzes: IQuizJoinTable[];
  unlocked_achievements: string[];
  highscores: IHighscoreJoinTable[];
}

export interface IQuizJoinTable {
  quiz: IQuiz;
  quiz_id: string;
  user_id: string;
}

export interface IHighscoreJoinTable {
  highscore: IHighscore;
  highscore_id: string;
  user_id: string;
}

export interface IUserSettings {
  id: string;
  user_id: string;
  theme: string;
  language: string;
  is_verified: boolean;
  roles: string;
}

export interface IUserStatistics {
  id: string;
  user_id: string;
  login_count: number;
  login_streak: number;
  max_login_streak: number;
  completed_quizzes: number;
  correct_answers: number;
  incorrect_answers: number;
  points: number;
}

export interface IUserTimestamps {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  billing_information_updated_at: string;
  statistics_updated_at: string;
  settings_updated_at: string;
  last_password_reset: string;
  last_login: string;
  last_logout: string;
}

export interface IUserBillinginfos {
  id: string;
  user_id: string;
  billing_address: string;
  billing_city: string;
  billing_country: string;
  billing_zip: string;
  billing_email: string;
  payment_method: "none" | "paypal" | "bank_transfer";
  payment_status: "none" | "pending" | "paid" | "failed" | "refunded";
  payment_date: string;
}
