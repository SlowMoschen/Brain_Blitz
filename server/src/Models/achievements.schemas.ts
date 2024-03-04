import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const achievements = pgTable('achievements', {
    id: text('id').primaryKey().default(createId()),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    category: varchar('category').notNull(),
    requirement: text('requirements').notNull(),
})

export type SelectAchievement = InferSelectModel<typeof achievements>;
export type InsertAchievement = InferInsertModel<typeof achievements>;