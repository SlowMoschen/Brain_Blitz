import { achievementsTable } from './achievements.model';
import { quizHighscoresTable, quizQuestionsTable, quizzesTable } from './quizzes.model';
import { tokensTable } from './tokens.model';
import {
  usersAppStates,
  usersBillingInformationTable,
  usersSettingsTable,
  usersStatisticsTable,
  usersTable,
  usersTimestampsTable,
} from './users.model';

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUserWithoutPassword = Omit<SelectUser, 'password'>;

export type SelectUserSettings = typeof usersSettingsTable.$inferSelect;
export type InsertUserSettings = typeof usersSettingsTable.$inferInsert;

export type SelectUserStatistics = typeof usersStatisticsTable.$inferSelect;
export type InsertUserStatistics = typeof usersStatisticsTable.$inferInsert;

export type SelectUserTimestamps = typeof usersTimestampsTable.$inferSelect;
export type InsertUserTimestamps = typeof usersTimestampsTable.$inferInsert;

export type SelectUserBillingInformation = typeof usersBillingInformationTable.$inferSelect;
export type InsertUserBillingInformation = typeof usersBillingInformationTable.$inferInsert;

export type SelectUserAppState = typeof usersAppStates.$inferSelect;
export type InsertUserAppState = typeof usersAppStates.$inferInsert;

export type SelectToken = typeof tokensTable.$inferSelect;
export type InsertToken = typeof tokensTable.$inferInsert;

export type SelectAchievement = typeof achievementsTable.$inferSelect;
export type InsertAchievement = typeof achievementsTable.$inferInsert;

export type SelectQuiz = typeof quizzesTable.$inferSelect;
export type InsertQuiz = typeof quizzesTable.$inferInsert;

export type SelectQuizHighscore = typeof quizHighscoresTable.$inferSelect;
export type InsertQuizHighscore = typeof quizHighscoresTable.$inferInsert;

export type SelectQuizQuestion = typeof quizQuestionsTable.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestionsTable.$inferInsert;

export type SelectUserWithAllTables = typeof usersTable.$inferSelect & {
	app_states: SelectUserAppState;
	settings: SelectUserSettings;
	statistics: SelectUserStatistics;
	timestamps: SelectUserTimestamps;
	billing_information: SelectUserBillingInformation;
};

export type InsertUserWithAllTables = typeof usersTable.$inferInsert & {
	app_states: InsertUserAppState;
	settings: InsertUserSettings;
	statistics: InsertUserStatistics;
	timestamps: InsertUserTimestamps;
	billing_information: InsertUserBillingInformation;
};

export type SelectQuizWithAllTables = typeof quizzesTable.$inferSelect & {
	highscores: SelectQuizHighscore;
	questions: SelectQuizQuestion;
};

export type InsertQuizWithAllTables = typeof quizzesTable.$inferInsert & {
	highscores: InsertQuizHighscore;
	questions: InsertQuizQuestion;
};
