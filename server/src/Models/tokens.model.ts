import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users.model';
import { relations } from 'drizzle-orm';

export const tokensTable = pgTable('tokens', {
	id: text('id')
		.primaryKey()
		.notNull()
		.$defaultFn(() => createId()),
	user_id: text('user_id')
		.notNull()
		.references(() => usersTable.id),
	token: text('token').notNull(),
	created_at: timestamp('created_at').notNull().defaultNow(),
	expires_at: timestamp('expires_at').notNull().defaultNow(),
});

export const tokenRelations = relations(tokensTable, ({ one }) => ({
	user: one(usersTable),
}));
