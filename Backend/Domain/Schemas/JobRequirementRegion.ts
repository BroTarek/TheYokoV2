import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { jobRequirements } from './JobRequirement';
import { regions } from './Region';

// JobRequirementRegion (Junction Table)
export const jobRequirementRegions = pgTable('job_requirement_region', {
    jobRequirementId: uuid('job_requirement_id').notNull().references(() => jobRequirements.id),
    regionId: uuid('region_id').notNull().references(() => regions.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.jobRequirementId, t.regionId] }),
}));