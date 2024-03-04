import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { achievements } from "./achievements.schemas";
import { quizzes } from "./quizzes.schemas";
import { tokens } from "./tokens.schemas";
import { createId } from "@paralleldrive/cuid2";

export const rolesEnum = pgEnum('roles', ['admin', 'user', 'pro'])
export const paymentMethodsEnum = pgEnum('payment_methods', ['paypal', 'bank_transfer'])

export const users = pgTable('users', {
    id: text('id').primaryKey().default(createId()),
    first_name: varchar('first_name').notNull(),
    last_name: varchar('last_name').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
})

export const user_settings = pgTable('user_settings', {
    id: text('id').primaryKey().default(createId()),
    user_id: text('user_id').notNull().references(() => users.id),
    theme: varchar('theme').notNull().default('default'),
    language: varchar('language').notNull().default('de-DE'),
    roles: rolesEnum('roles').default('user'),
    is_verified: boolean('is_verified').notNull().default(false),
})

export const user_statistics = pgTable('user_statistics', {
    id: text('id').primaryKey().default(createId()),
    user_id: text('user_id').notNull().references(() => users.id),
    max_login_streak: integer('max_login_streak').notNull().default(0),
    current_login_streak: integer('current_login_streak').notNull().default(0),
    total_logins: integer('total_logins').notNull().default(0),
    completed_quizzes: integer('completed_quizzes').notNull().default(0),
    completed_questions: integer('completed_questions').notNull().default(0),
    correct_answers: integer('correct_answers').notNull().default(0),
    wrong_answers: integer('wrong_answers').notNull().default(0),
    total_time: integer('total_time').notNull().default(0),
    total_points: integer('total_points').notNull().default(0),
})

export const user_timestamps = pgTable('user_timestamps', {
    id: text('id').primaryKey().default(createId()),
    user_id: text('user_id').notNull().references(() => users.id),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    last_login: timestamp('last_login').defaultNow(),
    last_logout: timestamp('last_logout').defaultNow(),
    last_quiz: timestamp('last_quiz').defaultNow(),
})

export const app_states = pgTable('app_states', {
    id: text('id').primaryKey().default(createId()),
    user_id: text('user_id').notNull().references(() => users.id),
    energy: integer('energy').notNull().default(100),
    unlocked_quizzes: text('unlocked_quizzes').references(() => quizzes.id),
    completed_quizzes: text('completed_quizzes').references(() => quizzes.id),
    unlocked_achievements: text('unlocked_achievements').references(() => achievements.id),
})

export const billing_informations = pgTable('billing_informations', {
    id: text('id').primaryKey().default(createId()),
    user_id: text('user_id').notNull().references(() => users.id),
    payment_method: paymentMethodsEnum('payment_methods').notNull(),
    billing_address: text('billing_address').notNull(),
    billing_city: varchar('billing_city').notNull(),
    billing_zip: varchar('billing_zip').notNull(),
    billing_country: varchar('billing_country').notNull(),
    billing_state: varchar('billing_state').notNull(),
    billing_phone: varchar('billing_phone').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
})

export const appStatesRelations = relations(app_states, ({ one, many }) => ({
    user: one(users),
    unlocked_quizzes: many(quizzes),
    completed_quizzes: many(quizzes),
    unlocked_achievements: many(achievements),
}))

export const userRelations = relations(users, ({ one, many }) => ({
    settings: one(user_settings),
    statistics: one(user_statistics),
    timestamps: one(user_timestamps),
    appStates: one(app_states),
    billing_informations: one(billing_informations),
    tokens: many(tokens),
}))

export type SelectUser = InferSelectModel<typeof users>;
export type SelectUserSettings = InferSelectModel<typeof user_settings>;
export type SelectUserStatistics = InferSelectModel<typeof user_statistics>;
export type SelectUserTimestamps = InferSelectModel<typeof user_timestamps>;
export type SelectAppStates = InferSelectModel<typeof app_states>;
export type SelectBillingInformations = InferSelectModel<typeof billing_informations>;

export type InsertUser = InferInsertModel<typeof users>;
export type InsertUserSettings = InferInsertModel<typeof user_settings>;
export type InsertUserStatistics = InferInsertModel<typeof user_statistics>;
export type InsertUserTimestamps = InferInsertModel<typeof user_timestamps>;
export type InsertAppStates = InferInsertModel<typeof app_states>;
export type InsertBillingInformations = InferInsertModel<typeof billing_informations>;
