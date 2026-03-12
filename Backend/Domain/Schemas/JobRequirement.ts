import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

import { yearsOfExperienceEnum, jobNatureEnum } from "./Enums"
import { jobFields } from "./JobField"
import { jobTitles } from "./JobTitle"
import { referralSources } from "./ReferralSource"
import { companies } from './Company';
import { applicants } from './Applicant'
// JobRequirement Table
export const jobRequirements = pgTable('job_requirement', {
    id: uuid('id').primaryKey().defaultRandom(),
    companyId: uuid('company_id').notNull().references(() => companies.id),
    jobTitleId: uuid('job_title_id').notNull().references(() => jobTitles.id),
    jobFieldId: uuid('job_field_id').notNull().references(() => jobFields.id),
    // selectedApplicants will be handled via a junction table or separate relationship.

    yearsOfExperience: yearsOfExperienceEnum('years_of_experience').notNull(),
    jobNature: jobNatureEnum('job_nature').notNull(),
    numberOfApplicantsNeeded: integer('number_of_applicants_needed').notNull(),
    numberOfApplicantsSelected: integer('number_of_applicants_selected').default(0),
    createdAt: timestamp('created_at').defaultNow(),
});