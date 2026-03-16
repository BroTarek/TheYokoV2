import { relations } from 'drizzle-orm';
import { applicants } from './Applicant';
import { regions } from './Region';
import { applicantRegions } from './ApplicantRegion';
import { companies } from './Company';
import { jobTitles } from './JobTitle';
import { jobFields } from './JobField';
import { referralSources } from './ReferralSource';
import { jobRequirements } from './JobRequirement';
import { jobRequirementRegions } from './JobRequirementRegion';

export const applicantRelations = relations(applicants, ({ one, many }) => ({
    jobTitle: one(jobTitles, {
        fields: [applicants.jobTitleId],
        references: [jobTitles.id],
    }),
    jobField: one(jobFields, {
        fields: [applicants.jobFieldId],
        references: [jobFields.id],
    }),
    referralSource: one(referralSources, {
        fields: [applicants.referralSourceId],
        references: [referralSources.id],
    }),
    applicantRegions: many(applicantRegions),
}));

export const regionRelations = relations(regions, ({ many }) => ({
    applicantRegions: many(applicantRegions),
    jobRequirementRegions: many(jobRequirementRegions),
}));

export const applicantRegionRelations = relations(applicantRegions, ({ one }) => ({
    applicant: one(applicants, {
        fields: [applicantRegions.applicantId],
        references: [applicants.id],
    }),
    region: one(regions, {
        fields: [applicantRegions.regionId],
        references: [regions.id],
    }),
}));

export const jobRequirementRelations = relations(jobRequirements, ({ one, many }) => ({
    company: one(companies, {
        fields: [jobRequirements.companyId],
        references: [companies.id],
    }),
    jobTitle: one(jobTitles, {
        fields: [jobRequirements.jobTitleId],
        references: [jobTitles.id],
    }),
    jobField: one(jobFields, {
        fields: [jobRequirements.jobFieldId],
        references: [jobFields.id],
    }),
    jobRequirementRegions: many(jobRequirementRegions),
}));

export const jobRequirementRegionRelations = relations(jobRequirementRegions, ({ one }) => ({
    jobRequirement: one(jobRequirements, {
        fields: [jobRequirementRegions.jobRequirementId],
        references: [jobRequirements.id],
    }),
    region: one(regions, {
        fields: [jobRequirementRegions.regionId],
        references: [regions.id],
    }),
}));

export const companyRelations = relations(companies, ({ many }) => ({
    jobRequirements: many(jobRequirements),
}));

export const jobTitleRelations = relations(jobTitles, ({ many }) => ({
    applicants: many(applicants),
    jobRequirements: many(jobRequirements),
}));

export const jobFieldRelations = relations(jobFields, ({ many }) => ({
    applicants: many(applicants),
    jobRequirements: many(jobRequirements),
}));
