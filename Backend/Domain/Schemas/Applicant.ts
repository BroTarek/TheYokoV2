import { pgTable, uuid, varchar, text, boolean, timestamp, integer, pgEnum, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import {yearsOfExperienceEnum,applicantStatusEnum} from "./Enums"
import {jobFields} from "./JobField"
import {jobTitles} from "./JobTitle"
import {referralSources} from "./ReferralSource"




// Applicant Table
export const applicants = pgTable('applicant', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: varchar('email', { length: 255 }),
    yearsOfExperience: yearsOfExperienceEnum('years_of_experience').notNull(),
    jobTitleId: uuid('job_title_id').notNull().references(() => jobTitles.id),
    jobFieldId: uuid('job_field_id').references(() => jobFields.id), // Temporarily nullable for migration
    referralSourceId: uuid('referral_source_id').notNull().references(() => referralSources.id),
    experienceDescription: text('experience_description'),
    googleDriveUrl: varchar('google_drive_url', { length: 500 }),
    lastCompany: varchar('last_company', { length: 255 }),
    applicationDate: timestamp('application_date').defaultNow(),
    status: applicantStatusEnum('status').default('unseen'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    isArchived: boolean('is_archived').default(false),
});

// Admin Table
export const admins = pgTable('admin', {
    id: uuid('id').primaryKey().defaultRandom(),
    adminMail: varchar('admin_mail', { length: 255 }).notNull().unique(),
    adminPass1: varchar('admin_pass_1', { length: 255 }).notNull(),
    adminPass2: varchar('admin_pass_2', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});