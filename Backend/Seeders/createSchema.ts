/**
 * createSchema.ts
 * Recreates all tables and enums from scratch using raw SQL,
 * exactly matching Domain/Schemas/*.ts definitions.
 * Run AFTER dropAndRecreate.ts.
 */
import { db } from '../db';
import { sql } from 'drizzle-orm';

async function createSchema() {
    console.log('🏗️  Creating database schema...');

    try {
        // ── Enums ──────────────────────────────────────────────────────────────
        await db.execute(sql`
            DO $$ BEGIN
                CREATE TYPE "years_of_experience" AS ENUM ('0-5', '5-10', '10+');
            EXCEPTION WHEN duplicate_object THEN NULL;
            END $$;
        `);
        await db.execute(sql`
            DO $$ BEGIN
                CREATE TYPE "job_nature" AS ENUM ('remote', 'fullTime', 'partTime', 'hybrid', 'freelance', 'contractor');
            EXCEPTION WHEN duplicate_object THEN NULL;
            END $$;
        `);
        await db.execute(sql`
            DO $$ BEGIN
                CREATE TYPE "entity_type" AS ENUM ('company', 'applicant', 'job_requirement');
            EXCEPTION WHEN duplicate_object THEN NULL;
            END $$;
        `);
        await db.execute(sql`
            DO $$ BEGIN
                CREATE TYPE "applicant_status" AS ENUM ('unseen', 'seen', 'reviewed', 'selected', 'done');
            EXCEPTION WHEN duplicate_object THEN NULL;
            END $$;
        `);
        console.log('✅ Enums created.');

        // ── job_field ──────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "job_field" (
                "id"   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" VARCHAR(100) NOT NULL
            );
        `);
        console.log('✅ job_field');

        // ── job_title ──────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "job_title" (
                "id"       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "title"    VARCHAR(100) NOT NULL,
                "field_id" UUID NOT NULL REFERENCES "job_field"("id")
            );
        `);
        console.log('✅ job_title');

        // ── region ─────────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "region" (
                "id"   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "name" VARCHAR(100) NOT NULL,
                "code" VARCHAR(10)  NOT NULL
            );
        `);
        console.log('✅ region');

        // ── referral_source ────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "referral_source" (
                "id"        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "name"      VARCHAR(100) NOT NULL,
                "is_active" BOOLEAN DEFAULT true
            );
        `);
        console.log('✅ referral_source');

        // ── company ────────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "company" (
                "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "name"        VARCHAR(255) NOT NULL,
                "description" TEXT,
                "is_archived" BOOLEAN DEFAULT false,
                "created_at"  TIMESTAMP DEFAULT now()
            );
        `);
        console.log('✅ company');

        // ── applicant ──────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "applicant" (
                "id"                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "first_name"             VARCHAR(100) NOT NULL,
                "last_name"              VARCHAR(100) NOT NULL,
                "phone"                  VARCHAR(20) NOT NULL,
                "email"                  VARCHAR(255),
                "years_of_experience"    "years_of_experience" NOT NULL,
                "job_title_id"           UUID NOT NULL REFERENCES "job_title"("id"),
                "job_field_id"           UUID REFERENCES "job_field"("id"),
                "referral_source_id"     UUID NOT NULL REFERENCES "referral_source"("id"),
                "experience_description" TEXT,
                "google_drive_url"       VARCHAR(500),
                "last_company"           VARCHAR(255),
                "application_date"       TIMESTAMP DEFAULT now(),
                "status"                 "applicant_status" DEFAULT 'unseen',
                "created_at"             TIMESTAMP DEFAULT now(),
                "updated_at"             TIMESTAMP DEFAULT now(),
                "is_archived"            BOOLEAN DEFAULT false
            );
        `);
        console.log('✅ applicant');

        // ── admin ──────────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "admin" (
                "id"           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "admin_mail"   VARCHAR(255) NOT NULL UNIQUE,
                "admin_pass_1" VARCHAR(255) NOT NULL,
                "admin_pass_2" VARCHAR(255) NOT NULL,
                "created_at"   TIMESTAMP DEFAULT now()
            );
        `);
        console.log('✅ admin');

        // ── applicant_region (junction) ────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "applicant_region" (
                "applicant_id" UUID NOT NULL REFERENCES "applicant"("id"),
                "region_id"    UUID NOT NULL REFERENCES "region"("id"),
                PRIMARY KEY ("applicant_id", "region_id")
            );
        `);
        console.log('✅ applicant_region');

        // ── job_requirement ────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "job_requirement" (
                "id"                            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "company_id"                    UUID NOT NULL REFERENCES "company"("id"),
                "job_title_id"                  UUID NOT NULL REFERENCES "job_title"("id"),
                "job_field_id"                  UUID NOT NULL REFERENCES "job_field"("id"),
                "years_of_experience"           "years_of_experience" NOT NULL,
                "job_nature"                    "job_nature" NOT NULL,
                "number_of_applicants_needed"   INTEGER NOT NULL,
                "number_of_applicants_selected" INTEGER DEFAULT 0,
                "created_at"                    TIMESTAMP DEFAULT now()
            );
        `);
        console.log('✅ job_requirement');

        // ── job_requirement_region (junction) ──────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "job_requirement_region" (
                "job_requirement_id" UUID NOT NULL REFERENCES "job_requirement"("id"),
                "region_id"          UUID NOT NULL REFERENCES "region"("id"),
                PRIMARY KEY ("job_requirement_id", "region_id")
            );
        `);
        console.log('✅ job_requirement_region');

        // ── job_requirement_applicant (junction) ───────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "job_requirement_applicant" (
                "job_requirement_id" UUID NOT NULL REFERENCES "job_requirement"("id"),
                "applicant_id"       UUID NOT NULL REFERENCES "applicant"("id"),
                PRIMARY KEY ("job_requirement_id", "applicant_id")
            );
        `);
        console.log('✅ job_requirement_applicant');

        // ── archive_log ────────────────────────────────────────────────────────
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "archive_log" (
                "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "entity_type" "entity_type" NOT NULL,
                "entity_id"   UUID NOT NULL,
                "archived_at" TIMESTAMP DEFAULT now(),
                "archived_by" UUID
            );
        `);
        console.log('✅ archive_log');

        console.log('\n🎉 Schema creation complete! Run: npm run seed');

    } catch (error) {
        console.error('❌ SCHEMA CREATION FAILED:', error);
    } finally {
        process.exit(0);
    }
}

createSchema();
