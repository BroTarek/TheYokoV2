import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const yearsOfExperienceEnum = pgEnum('years_of_experience', ['0-5', '5-10', '10+']);
export const jobNatureEnum = pgEnum('job_nature', ['remote', 'fullTime', 'partTime', 'hybrid', 'freelance', 'contractor']);
export const entityTypeEnum = pgEnum('entity_type', ['company', 'applicant', 'job_requirement']);
export const applicantStatusEnum = pgEnum('applicant_status', ['unseen', 'seen', 'reviewed', 'selected', 'done']);


