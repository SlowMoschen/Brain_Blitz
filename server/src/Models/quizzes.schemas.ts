import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.schemas";
import { createId } from "@paralleldrive/cuid2";

export const quizzes = pgTable('quizzes', {
    id: text('id').primaryKey().default(createId()),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    category: varchar('category').notNull(),
    highscores: text('highscores').references(() => quiz_highscores.id),
    questions: text('questions').references(() => quiz_questions.id),
})

export const quiz_highscores = pgTable('quiz_highscores', {
    id: text('id').primaryKey().default(createId()),
    quiz_id: text('quiz_id').notNull().references(() => quizzes.id),
    user_id: text('user_id').notNull().references(() => users.id),
    score: integer('score').notNull(),
    time: integer('time').notNull(),
})

export const quiz_questions = pgTable('quiz_questions', {
    id: text('id').primaryKey().default(createId()),
    quiz_id: text('quiz_id').notNull().references(() => quizzes.id),
    questions: text('questions').array().notNull(),
    correct_answer: text('correct_answer').notNull(),
})

export const quizRelations = relations(quizzes, ({ one, many }) => ({
    highscores: many(quiz_highscores),
    questions: many(quiz_questions),
}))

export type SelectQuiz = InferSelectModel<typeof quizzes>;
export type SelectQuizHighscore = InferSelectModel<typeof quiz_highscores>;
export type SelectQuizQuestion = InferSelectModel<typeof quiz_questions>;

export type InsertQuiz = InferInsertModel<typeof quizzes>;
export type InsertQuizHighscore = InferInsertModel<typeof quiz_highscores>;
export type InsertQuizQuestion = InferInsertModel<typeof quiz_questions>;
