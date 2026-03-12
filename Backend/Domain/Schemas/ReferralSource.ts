import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ReferralSource Table
export const referralSources = pgTable('referral_source', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    isActive: boolean('is_active').default(true),
});
