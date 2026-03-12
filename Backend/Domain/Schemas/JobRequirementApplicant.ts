import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { jobRequirements } from './JobRequirement';
import { applicants } from './Applicant';

// JobRequirementApplicant (Junction Table for selected applicants)
export const jobRequirementApplicants = pgTable('job_requirement_applicant', {
    jobRequirementId: uuid('job_requirement_id').notNull().references(() => jobRequirements.id),
    applicantId: uuid('applicant_id').notNull().references(() => applicants.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.jobRequirementId, t.applicantId] }),
}));
