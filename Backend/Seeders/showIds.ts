import { db } from '../db';
import { jobTitles, jobFields, referralSources, regions } from '../Domain/Schemas';

async function showIds() {
    const [titles, fields, refs, regs] = await Promise.all([
        db.select().from(jobTitles).limit(10),
        db.select().from(jobFields),
        db.select().from(referralSources),
        db.select().from(regions),
    ]);

    console.log('\n=== JOB TITLES (first 10) ===');
    titles.forEach(r => console.log(`  ${r.id}  ${r.title}`));

    console.log('\n=== JOB FIELDS ===');
    fields.forEach(r => console.log(`  ${r.id}  ${r.name}`));

    console.log('\n=== REFERRAL SOURCES ===');
    refs.forEach(r => console.log(`  ${r.id}  ${r.name}`));

    console.log('\n=== REGIONS ===');
    regs.forEach(r => console.log(`  ${r.id}  ${r.name}`));

    process.exit(0);
}

showIds();
