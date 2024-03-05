import { boolean, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
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
});

export const usersSettingsTable = pgTable('users_settings', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.references(() => usersTable.id, {onDelete: 'cascade'}).notNull(),
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
		.references(() => usersTable.id, {onDelete: 'cascade'}),
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
		.references(() => usersTable.id, {onDelete: 'cascade'}),
	created_at: timestamp('created_at').notNull().defaultNow(),
	updated_at: timestamp('updated_at').notNull().defaultNow(),
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
		.references(() => usersTable.id, {onDelete: 'cascade'}),
	billing_address: text('billing_address').notNull().default(''),
	billing_city: text('billing_city').notNull().default(''),
	billing_state: text('billing_state').notNull().default(''),
	billing_zip: text('billing_zip').notNull().default(''),
	billing_country: text('billing_country').notNull().default(''),
	payment_status: paymentStatusEnum('payment_status').notNull().default('none'),
	payment_method: paymentMethodEnum('payment_method').notNull().default('none'),
	payment_date: timestamp('payment_date').notNull().defaultNow(),
});

export const usersAppStates = pgTable('users_app_states', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.notNull()
		.references(() => usersTable.id, {onDelete: 'cascade'}),
	unlocked_quizzes: text('unlocked_quizzes').references(() => quizzesTable.id),
	completed_quizzes: text('completed_quizzes').references(() => quizzesTable.id),
	unlocked_achievements: text('unlocked_achievements').references(() => achievementsTable.id),
	highscores: text('highscores').references(() => quizHighscoresTable.id, {onDelete: 'cascade'}),
});

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

export const usersAppStatesRelations = relations(usersAppStates, ({ one, many }) => ({
	user: one(usersTable, {
		fields: [usersAppStates.user_id],
		references: [usersTable.id],
	}),
	unlocked_quizzes: many(quizzesTable),
	completed_quizzes: many(quizzesTable),
	unlocked_achievements: many(achievementsTable),
	highscores: many(quizHighscoresTable),
}));

export const usersRelations = relations(usersTable, ({ one, many }) => ({
	settings: one(usersSettingsTable),
	statistics: one(usersStatisticsTable),
	timestamps: one(usersTimestampsTable),
	billing_information: one(usersBillingInformationTable),
	app_states: one(usersAppStates),
	tokens: many(tokensTable),
}));
