import { db } from '../db';
import { sql } from 'drizzle-orm';

async function dropAll() {
    console.log('💣 Dropping all tables and enums...');

    try {
        // Drop all tables in correct order (respecting FK constraints)
        await db.execute(sql`
            DROP TABLE IF EXISTS
                "archive_log",
                "job_requirement_applicant",
                "applicant_region",
                "job_requirement_region",
                "applicant",
                "job_requirement",
                "job_title",
                "job_field",
                "referral_source",
                "region",
                "company"
            CASCADE;
        `);
        console.log('✅ All tables dropped.');

        // Drop custom enums
        await db.execute(sql`DROP TYPE IF EXISTS "years_of_experience" CASCADE;`);
        await db.execute(sql`DROP TYPE IF EXISTS "job_nature" CASCADE;`);
        await db.execute(sql`DROP TYPE IF EXISTS "entity_type" CASCADE;`);
        await db.execute(sql`DROP TYPE IF EXISTS "applicant_status" CASCADE;`);
        console.log('✅ All enums dropped.');

        // Drop drizzle migrations tracking table so push works cleanly
        await db.execute(sql`DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE;`);
        console.log('✅ Migrations table dropped.');

        console.log('🎉 Database is now clean. Run `npx drizzle-kit push` to recreate the schema.');
    } catch (error) {
        console.error('❌ DROP FAILED:', error);
    } finally {
        process.exit(0);
    }
}

dropAll();
