import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schemas";
import { createId } from "@paralleldrive/cuid2";

export const tokens = pgTable('token', {
    id: text('id').primaryKey().default(createId()),
    user_id: text('user_id').notNull().references(() => users.id),
    token: text('token').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    expires_at: timestamp('expires_at').$default(() => sql`now() + interval '1 day'`),
})

export const tokenRelations = relations(tokens, ({ one }) => ({
    user: one(users)
}))

export type SelectToken = InferSelectModel<typeof tokens>;
export type InsertToken = InferInsertModel<typeof tokens>;