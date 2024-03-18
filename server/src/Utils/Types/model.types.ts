import { achievementsTable } from '../../Models/achievements.model';
import { quizHighscoresTable, quizQuestionsTable, quizzesTable } from '../../Models/quizzes.model';
import { tokensTable } from '../../Models/tokens.model';
import {
	completedQuizzes,
	highscores,
	unlockedAchievements,
	unlockedQuizzes,
	usersBillingInformationTable,
	usersSettingsTable,
	usersStatisticsTable,
	usersTable,
	usersTimestampsTable
} from '../../Models/users.model';

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

export type SelectUnlockedQuizzes = typeof unlockedQuizzes.$inferSelect;
export type InsertUnlockedQuizzes = typeof unlockedQuizzes.$inferInsert;

export type SelectUnlockedAchievements = typeof unlockedAchievements.$inferSelect;
export type InsertUnlockedAchievements = typeof unlockedAchievements.$inferInsert;

export type SelectCompletedQuizzes = typeof completedQuizzes.$inferSelect;
export type InsertCompletedQuizzes = typeof completedQuizzes.$inferInsert;

export type SelectHighscores = typeof highscores.$inferSelect;
export type InsertHighscores = typeof highscores.$inferInsert;

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
	unlocked_quizzes: SelectUnlockedQuizzes[];
	completed_quizzes: SelectCompletedQuizzes[];
	unlocked_achievements: SelectUnlockedAchievements[];
	highscores: SelectHighscores;
	settings: SelectUserSettings;
	statistics: SelectUserStatistics;
	timestamps: SelectUserTimestamps;
	billing_information: SelectUserBillingInformation;
};

export type InsertUserWithAllTables = typeof usersTable.$inferInsert & {
	unlocked_quizzes: InsertUnlockedQuizzes;
	completed_quizzes: InsertCompletedQuizzes;
	unlocked_achievements: InsertUnlockedAchievements;
	highscores: InsertHighscores;
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
