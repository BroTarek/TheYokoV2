import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import {applicants} from "./Applicant"
import {regions} from "./Region"
// ApplicantRegion (Junction Table)
export const applicantRegions = pgTable('applicant_region', {
    applicantId: uuid('applicant_id').notNull().references(() => applicants.id),
    regionId: uuid('region_id').notNull().references(() => regions.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.applicantId, t.regionId] }),
}));
