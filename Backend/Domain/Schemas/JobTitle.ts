import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { jobFields } from './JobField';

// JobTitle Table
export const jobTitles = pgTable('job_title', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 100 }).notNull(),
    fieldId: uuid('field_id').notNull().references(() => jobFields.id),
});
