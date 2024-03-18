import { boolean, integer, pgEnum, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { quizHighscoresTable, quizzesTable } from './quizzes.model';
import { achievementsTable } from './achievements.model';
import { relations } from 'drizzle-orm';
import { tokensTable } from './tokens.model';

export const rolesEnum = pgEnum('roles', ['admin', 'user', 'premium_user']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'failed', 'refunded', 'none']);
export const paymentMethodEnum = pgEnum('payment_method', ['paypal', 'bank_transfer', 'none']);

export const usersTable = pgTable('users', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	first_name: text('first_name').notNull(),
	last_name: text('last_name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	energy: integer('energy').notNull().default(100),
});

export const usersSettingsTable = pgTable('users_settings', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.references(() => usersTable.id, { onDelete: 'cascade' })
		.notNull(),
	theme: text('theme').notNull().default('default'),
	language: text('language').notNull().default('de-DE'),
	is_verified: boolean('is_verified').notNull().default(false),
	roles: rolesEnum('roles').notNull().default('user'),
});

export const usersStatisticsTable = pgTable('users_statistics', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	login_count: integer('login_count').notNull().default(0),
	login_streak: integer('login_streak').notNull().default(0),
	max_login_streak: integer('max_login_streak').notNull().default(0),
	completed_quizzes: integer('completed_quizzes').notNull().default(0),
	correct_answers: integer('correct_answers').notNull().default(0),
	incorrect_answers: integer('incorrect_answers').notNull().default(0),
	points: integer('points').notNull().default(0),
});

export const usersTimestampsTable = pgTable('users_timestamps', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
	billing_information_updated_at: timestamp('billing_information_updated_at').notNull().defaultNow(),
	statistics_updated_at: timestamp('statistics_updated_at').notNull().defaultNow(),
	settings_updated_at: timestamp('settings_updated_at').notNull().defaultNow(),
	last_password_reset: timestamp('last_password_reset').notNull().defaultNow(),
	last_login: timestamp('last_login').notNull().defaultNow(),
	last_logout: timestamp('last_logout').notNull().defaultNow(),
	last_quiz_completed: timestamp('last_quiz_completed').notNull().defaultNow(),
});

export const usersBillingInformationTable = pgTable('users_billing_information', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	billing_address: text('billing_address').notNull().default(''),
	billing_city: text('billing_city').notNull().default(''),
	billing_state: text('billing_state').notNull().default(''),
	billing_zip: text('billing_zip').notNull().default(''),
	billing_country: text('billing_country').notNull().default(''),
	payment_status: paymentStatusEnum('payment_status').notNull().default('none'),
	payment_method: paymentMethodEnum('payment_method').notNull().default('none'),
	payment_date: timestamp('payment_date').notNull().defaultNow(),
});

export const unlockedQuizzes = pgTable(
	'unlocked_quizzes',
	{
		user_id: text('user_id').notNull().references(() => usersTable.id),
		quiz_id: text('quiz_id').notNull().references(() => quizzesTable.id),
	},
	(t) => ({
		cpk: primaryKey({ name: 'composite_pk', columns: [t.user_id, t.quiz_id]}),
	}),
);

export const completedQuizzes = pgTable(
	'completed_quizzes',
	{
		user_id: text('user_id').notNull().references(() => usersTable.id),
		quiz_id: text('quiz_id').notNull().references(() => quizzesTable.id),
	},
	(t) => ({
		cpk: primaryKey({ name: 'composite_pk', columns: [t.user_id, t.quiz_id]}),
	}),
);

export const unlockedAchievements = pgTable(
	'unlocked_achievements',
	{
		user_id: text('user_id').notNull().references(() => usersTable.id),
		achievement_id: text('achievement_id').notNull().references(() => achievementsTable.id),
	},
	(t) => ({
		cpk: primaryKey({ name: 'composite_pk', columns: [t.user_id, t.achievement_id]}),
	}),
);

export const highscores = pgTable(
	'highscores',
	{
		user_id: text('user_id').notNull().references(() => usersTable.id),
		highscore_id: text('quiz_id').notNull().references(() => quizHighscoresTable.id),
	},
	(t) => ({
		// pk: primaryKey(t.user_id, t.highscore_id),
		cpk: primaryKey({ name: 'composite_pk', columns: [t.user_id, t.highscore_id]}),
	}),
);

export const usersHighscoresRelations = relations(highscores, ({ one }) => ({
	user: one(usersTable, {
		fields: [highscores.user_id],
		references: [usersTable.id],
	}),
	quiz: one(quizHighscoresTable, {
		fields: [highscores.highscore_id],
		references: [quizHighscoresTable.id],
	}),
}));

export const completedQuizzesRelations = relations(completedQuizzes, ({ one }) => ({
	user: one(usersTable, {
		fields: [completedQuizzes.user_id],
		references: [usersTable.id],
	}),
	quiz: one(quizzesTable, {
		fields: [completedQuizzes.quiz_id],
		references: [quizzesTable.id],
	}),
}));

export const unlockedAchievementsRelations = relations(unlockedAchievements, ({ one }) => ({
	user: one(usersTable, {
		fields: [unlockedAchievements.user_id],
		references: [usersTable.id],
	}),
	achievement: one(achievementsTable, {
		fields: [unlockedAchievements.achievement_id],
		references: [achievementsTable.id],
	}),
}));

export const unlockedQuizzesRelations = relations(unlockedQuizzes, ({ one }) => ({
	user: one(usersTable, {
		fields: [unlockedQuizzes.user_id],
		references: [usersTable.id],
	}),
	quiz: one(quizzesTable, {
		fields: [unlockedQuizzes.quiz_id],
		references: [quizzesTable.id],
	}),
}));

export const usersSettingsRelations = relations(usersSettingsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [usersSettingsTable.user_id],
		references: [usersTable.id],
	}),
}));

export const usersStatisticsRelations = relations(usersStatisticsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [usersStatisticsTable.user_id],
		references: [usersTable.id],
	}),
}));

export const usersTimestampsRelations = relations(usersTimestampsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [usersTimestampsTable.user_id],
		references: [usersTable.id],
	}),
}));

export const usersBillingInformationRelations = relations(usersBillingInformationTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [usersBillingInformationTable.user_id],
		references: [usersTable.id],
	}),
}));

export const usersRelations = relations(usersTable, ({ one, many }) => ({
	settings: one(usersSettingsTable),
	statistics: one(usersStatisticsTable),
	timestamps: one(usersTimestampsTable),
	billing_information: one(usersBillingInformationTable),
	tokens: many(tokensTable),
	unlocked_quizzes: many(unlockedQuizzes),
	completed_quizzes: many(completedQuizzes),
	unlocked_achievements: many(unlockedAchievements),
	highscores: many(highscores),
}));
