// spread each CRUD entity validation into its own file

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import * as schema from '../models/schema';

// --------------------
// Region Validations
// --------------------
export const insertRegionSchema = createInsertSchema(schema.regions)
  .omit({ id: true })
  .extend({
    name: z.string().trim().min(2).max(100),
    code: z.string().trim().min(1).max(10),
  });

export const selectRegionSchema = createSelectSchema(schema.regions);

// --------------------
// ReferralSource Validations
// --------------------
export const insertReferralSourceSchema = createInsertSchema(schema.referralSources)
  .omit({ id: true })
  .extend({
    name: z.string().trim().min(2).max(100),
    isActive: z.boolean().optional(),
  });

// --------------------
// JobField Validations
// --------------------
export const insertJobFieldSchema = createInsertSchema(schema.jobFields)
  .omit({ id: true })
  .extend({
    name: z.string().trim().min(2).max(100),
  });

// --------------------
// JobTitle Validations
// --------------------
export const insertJobTitleSchema = createInsertSchema(schema.jobTitles)
  .omit({ id: true })
  .extend({
    title: z.string().trim().min(2).max(100),
    fieldId: z.string().uuid(),
  });

// --------------------
// Company Validations
// --------------------
export const insertCompanySchema = createInsertSchema(schema.companies)
  .omit({ id: true, createdAt: true, isArchived: true })
  .extend({
    name: z.string().trim().min(2).max(255),
    description: z.string().trim().max(2000).optional(),
  });

// --------------------
// JobRequirement Validations
// --------------------
export const insertJobRequirementSchema = createInsertSchema(schema.jobRequirements)
  .omit({ 
    id: true, 
    createdAt: true, 
    numberOfApplicantsSelected: true 
  })
  .extend({
    companyId: z.string().uuid(),
    jobTitleId: z.string().uuid(),
    jobFieldId: z.string().uuid(),
    yearsOfExperience: z.enum(['0-5','5-10','10+']),
    jobNature: z.enum(['remote','fullTime','partTime','hybrid','freelance','contractor']),
    numberOfApplicantsNeeded: z.number().int().min(1).max(10000),
  })
  .superRefine((data, ctx) => {
    if (data.numberOfApplicantsNeeded <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Number of applicants needed must be greater than 0",
        path: ["numberOfApplicantsNeeded"],
      });
    }
  });

// --------------------
// Applicant Validations
// --------------------
export const insertApplicantSchema = createInsertSchema(schema.applicants)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    isArchived: true,
    applicationDate: true,
  })
  .extend({
    firstName: z.string().trim().min(2).max(100),
    lastName: z.string().trim().min(2).max(100),
    phone: z.string().trim().regex(/^[0-9+\-\s()]{6,20}$/, "Invalid phone number"),
    email: z.string().trim().toLowerCase().email().optional(),
    jobTitleId: z.string().uuid(),
    referralSourceId: z.string().uuid(),
    googleDriveUrl: z.string().trim().url().optional(),
    experienceDescription: z.string().trim().max(5000).optional(),
  });

// --------------------
// Junction Table Validations
// --------------------
export const insertApplicantRegionSchema = createInsertSchema(schema.applicantRegions)
  .extend({
    applicantId: z.string().uuid(),
    regionId: z.string().uuid(),
  });

export const insertJobRequirementRegionSchema = createInsertSchema(schema.jobRequirementRegions)
  .extend({
    jobRequirementId: z.string().uuid(),
    regionId: z.string().uuid(),
  });

// --------------------
// Archive Log Validations
// --------------------
export const insertArchiveLogSchema = createInsertSchema(schema.archiveLogs)
  .omit({ id: true, archivedAt: true })
  .extend({
    entityId: z.string().uuid(),
    archivedBy: z.string().uuid().optional(),
    entityType: z.enum(['company','applicant','job_requirement']),
  });