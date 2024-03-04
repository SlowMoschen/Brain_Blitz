import {
  AnyPgColumn,
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { usersTable } from './users.model';
import { relations } from 'drizzle-orm';

export const quizzesTable = pgTable('quizzes', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  highscores: text('highscores').references((): AnyPgColumn => quizHighscoresTable.id),
  questions: text('questions').references((): AnyPgColumn => quizQuestionsTable.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const quizQuestionsTable = pgTable('quiz_questions', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  quiz_id: text('quiz_id')
    .notNull()
    .references(() => quizzesTable.id),
  question: text('question').notNull(),
  answers: text('answers').array().notNull(),
  correct_answer: text('correct_answer').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const quizHighscoresTable = pgTable('quiz_highscores', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId()),
  quiz_id: text('quiz_id')
    .notNull()
    .references(() => quizzesTable.id),
  user_id: text('user_id')
    .notNull()
    .references(() => usersTable.id),
  score: integer('score').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

export const highscoresRelations = relations(
  quizHighscoresTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [quizHighscoresTable.user_id],
      references: [usersTable.id],
    }),
    quiz: one(quizzesTable, {
      fields: [quizHighscoresTable.quiz_id],
      references: [quizzesTable.id],
    }),
  }),
);

export const questionsRelations = relations(quizQuestionsTable, ({ one }) => ({
  quiz: one(quizzesTable, {
    fields: [quizQuestionsTable.quiz_id],
    references: [quizzesTable.id],
  }),
}));

export const quizRelations = relations(quizzesTable, ({ one, many }) => ({
  highscores: many(quizHighscoresTable),
  questions: many(quizQuestionsTable),
}));
