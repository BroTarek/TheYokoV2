import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { entityTypeEnum } from './Enums';

// ArchiveLog Table
export const archiveLogs = pgTable('archive_log', {
    id: uuid('id').primaryKey().defaultRandom(),
    entityType: entityTypeEnum('entity_type').notNull(),
    entityId: uuid('entity_id').notNull(),
    archivedAt: timestamp('archived_at').defaultNow(),
    archivedBy: uuid('archived_by'), // Could reference a User table if it existed
});