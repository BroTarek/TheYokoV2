import { z } from "zod";

export const YearsOfExperienceSchema = z.enum(['0-5', '5-10', '10+']);
export const JobNatureSchema = z.enum(['remote', 'fullTime', 'partTime', 'hybrid', 'freelance', 'contractor']);
export const ApplicantStatusSchema = z.enum(['unseen', 'seen', 'reviewed', 'selected', 'done']);

export const RegionSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
});

export const JobFieldSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});

export const JobTitleSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    name: z.string().optional(), // Backend sometimes returns 'name' instead of 'title' in joins
    field: JobFieldSchema.optional().nullable(),
});

export const CompanySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().optional().nullable(),
    is_archived: z.boolean().optional(),
    created_at: z.string().or(z.date()).optional(),
    fields: z.array(JobFieldSchema).optional(),
    jobRequirementsCount: z.number().optional(),
});

export const JobRequirementSchema = z.object({
    id: z.string().uuid(),
    jobTitle: JobTitleSchema.optional().nullable(),
    yearsOfExperience: YearsOfExperienceSchema,
    jobNature: JobNatureSchema,
    numberOfApplicantsNeeded: z.number(),
    numberOfApplicantsSelected: z.number().optional(),
    desiredRegions: z.array(RegionSchema).optional(),
    created_at: z.string().or(z.date()).optional(),
});

export const ApplicantSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional().nullable(),
    phone: z.string(),
    yearsOfExperience: YearsOfExperienceSchema,
    jobField: JobFieldSchema.optional().nullable(),
    jobTitle: JobTitleSchema.optional().nullable(),
    desiredRegions: z.array(RegionSchema).optional(),
    regions: z.array(RegionSchema).optional(),
    status: ApplicantStatusSchema.optional(),
    isArchived: z.boolean().optional(),
    createdAt: z.string().or(z.date()).optional(),
});

export const PaginationSchema = z.object({
    currentPage: z.number(),
    limit: z.number(),
    numberOfPages: z.number(),
    totalCount: z.number(),
});

export type pagination = z.infer<typeof PaginationSchema>;

export type Company = z.infer<typeof CompanySchema>;
export type Applicant = z.infer<typeof ApplicantSchema>;
export type JobRequirement = z.infer<typeof JobRequirementSchema>;
export type JobField = z.infer<typeof JobFieldSchema>;
export type JobTitle = z.infer<typeof JobTitleSchema>;
export type Region = z.infer<typeof RegionSchema>;

export const ReferralSourceSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    isActive: z.boolean().optional().default(true),
});
export type ReferralSource = z.infer<typeof ReferralSourceSchema>;
