import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const achievementsTable = pgTable('achievements', {
    id: text('id').primaryKey().notNull().$defaultFn(() => createId()),
    title: text('title').notNull(),
    description: text('description').notNull(),
    requirements: text('requirements').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
})