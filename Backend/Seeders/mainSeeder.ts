import { db } from '../db';
import * as schema from '../Domain/Schemas';
import { sql } from 'drizzle-orm';

const firstNames = [
    'John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Jennifer',
    'Robert', 'Mary', 'William', 'Patricia', 'Richard', 'Jessica', 'Joseph'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'
];

const experienceDescriptions = [
    'Experienced professional with strong background in product management and strategy.',
    'Skilled in supply chain optimization and logistics coordination.',
    'Expert in HR operations with focus on talent acquisition and development.',
    'Finance specialist with expertise in budgeting and financial analysis.',
    'Sales professional with proven track record in B2B and B2C markets.',
    'Marketing expert skilled in digital campaigns and brand development.',
    'Strategic leader with experience in organizational development.',
    'Customer success specialist with strong communication skills.',
    'Technical professional with background in software implementation.',
    'Business analyst with expertise in process improvement.'
];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function generateEmail(firstName: string, lastName: string, index: number): string {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`;
}

function generatePhone(): string {
    const countryCode = '+964';
    const areaCode = Math.floor(Math.random() * 9) + 77;
    const number = Math.floor(Math.random() * 9000000) + 1000000;
    return `${countryCode} ${areaCode}${number}`;
}

async function main() {
    console.log('🌱 Starting full database seed...');

    try {
        // 1. Clear all tables in correct order (safe: skip if tables don't exist yet)
        console.log('🧹 Clearing existing data...');
        try {
            await db.execute(sql`TRUNCATE TABLE 
          "applicant_region", 
          "job_requirement_region", 
          "job_requirement_applicant", 
          "applicant", 
          "job_requirement", 
          "job_title", 
          "job_field", 
          "referral_source", 
          "region", 
          "company", 
          "archive_log" 
          RESTART IDENTITY CASCADE`);
            console.log('✅ Tables cleared.');
        } catch (truncateErr: any) {
            if (truncateErr?.code === '42P01') {
                console.log('ℹ️  Tables are freshly created — skipping TRUNCATE.');
            } else {
                throw truncateErr;
            }
        }

        // 2. Seed Job Fields
        console.log('📂 Seeding job fields...');
        const fieldData = [
            { name: 'Product' },
            { name: 'Logistics' },
            { name: 'Human Resources' },
            { name: 'Finance' },
            { name: 'Sales' },
            { name: 'Marketing' },
            { name: 'Management' },
            { name: 'CRM/CX' },
            { name: 'Parts' },
            { name: 'Service' },
            { name: 'Director' },
            { name: 'C-Level' }
        ];
        const insertedFields = await db.insert(schema.jobFields).values(fieldData).returning();
        console.log(`✅ Seeded ${insertedFields.length} job fields.`);

        // 3. Seed Job Titles (dynamically linked to inserted fields)
        console.log('🏷️ Seeding job titles...');
        const titlesData = [];

        // Helper to find field ID by name
        const getFieldId = (name: string) => insertedFields.find(f => f.name === name)?.id;

        // Add titles for each field
        const fieldTitlesMapping: Record<string, string[]> = {
            'Product': ['Product Manager', 'Product Owner', 'Associate Product Manager', 'Director of Product', 'Product Designer'],
            'Logistics': ['Logistics Coordinator', 'Supply Chain Manager', 'Warehouse Manager', 'Logistics Analyst'],
            'Human Resources': ['HR Generalist', 'HR Business Partner', 'Talent Acquisition Specialist', 'Recruitment Manager'],
            'Finance': ['Financial Analyst', 'Accountant', 'Controller', 'Finance Manager', 'CFO'],
            'Sales': ['Sales Representative', 'Account Executive', 'Sales Manager', 'Business Development Manager'],
            'Marketing': ['Marketing Manager', 'Digital Marketing Specialist', 'Content Marketing Manager', 'Brand Manager'],
            'Management': ['Operations Manager', 'General Manager', 'Project Manager', 'Program Manager'],
            'CRM/CX': ['CRM Manager', 'Customer Experience Manager', 'Customer Success Manager', 'CRM Analyst'],
            'Parts': ['Parts Manager', 'Parts Specialist', 'Inventory Parts Coordinator'],
            'Service': ['Service Manager', 'Customer Service Representative', 'Technical Support Specialist'],
            'Director': ['Director of Operations', 'Director of Sales', 'Marketing Director', 'HR Director'],
            'C-Level': ['CEO', 'CFO', 'COO', 'CTO', 'CMO']
        };

        for (const [fieldName, titles] of Object.entries(fieldTitlesMapping)) {
            const fieldId = getFieldId(fieldName);
            if (fieldId) {
                titles.forEach(t => titlesData.push({ title: t, fieldId }));
            }
        }

        const insertedTitles = await db.insert(schema.jobTitles).values(titlesData).returning();
        console.log(`✅ Seeded ${insertedTitles.length} job titles.`);

        // 4. Seed Regions
        console.log('🌍 Seeding regions...');
        const regionsData = [
            { name: "Libya", code: "LY" },
            { name: "Syria", code: "SY" },
            { name: "Iraq", code: "IQ" },
            { name: "Yemen", code: "YE" },
            { name: "Lebanon", code: "LB" },
            { name: "Palestine", code: "PS" },
            { name: "Jordan", code: "JO" },
            { name: "GCC", code: "GCC" },
            { name: "NorthAfrica", code: "NA" },
        ];
        const insertedRegions = await db.insert(schema.regions).values(regionsData).returning();
        console.log(`✅ Seeded ${insertedRegions.length} regions.`);

        // 5. Seed Referral Sources
        console.log('📢 Seeding referral sources...');
        const referralData = [
            { name: 'Indeed' },
            { name: 'LinkedIn' },
            { name: 'Facebook' },
            { name: 'Company Website' }
        ];
        const insertedReferrals = await db.insert(schema.referralSources).values(referralData).returning();
        console.log(`✅ Seeded ${insertedReferrals.length} referral sources.`);

        // 6. Seed Companies
        console.log('🏢 Seeding companies...');
        const companiesData = [
            { name: 'Tech innovations Ltd', description: 'Advanced software solutions' },
            { name: 'Global Logistics Corp', description: 'Worldwide shipping' },
            { name: 'MediCare Systems', description: 'Healthcare technology' }
        ];
        const insertedCompanies = await db.insert(schema.companies).values(companiesData).returning();
        console.log(`✅ Seeded ${insertedCompanies.length} companies.`);

        // 7. Seed Applicants (25 random ones)
        console.log('👥 Seeding 25 applicants...');
        const yearsExpOptions = ['0-5', '5-10', '10+'];

        for (let i = 0; i < 25; i++) {
            const firstName = getRandomItem(firstNames);
            const lastName = getRandomItem(lastNames);
            const randomTitle = getRandomItem(insertedTitles);
            const randomReferral = getRandomItem(insertedReferrals);

            const [applicant] = await db.insert(schema.applicants).values({
                firstName,
                lastName,
                email: generateEmail(firstName, lastName, i),
                phone: generatePhone(),
                yearsOfExperience: getRandomItem(yearsExpOptions) as any,
                jobFieldId: randomTitle.fieldId!, // Linked to the title's field
                jobTitleId: randomTitle.id,
                referralSourceId: randomReferral.id,
                experienceDescription: getRandomItem(experienceDescriptions),
                status: 'unseen'
            }).returning();

            // Seed 1-3 random regions per applicant
            const numRegions = Math.floor(Math.random() * 3) + 1;
            const applicantRegionsData = [];
            const shuffledRegions = [...insertedRegions].sort(() => 0.5 - Math.random());
            for (let j = 0; j < numRegions; j++) {
                applicantRegionsData.push({
                    applicantId: applicant.id,
                    regionId: shuffledRegions[j].id
                });
            }
            await db.insert(schema.applicantRegions).values(applicantRegionsData);
        }
        console.log('✅ Seeded 25 applicants with region associations.');

        // 8. Seed some Job Requirements
        console.log('📝 Seeding job requirements...');
        const jobReqsData = [];
        for (let i = 0; i < 5; i++) {
            const randomCompany = getRandomItem(insertedCompanies);
            const randomTitle = getRandomItem(insertedTitles);
            jobReqsData.push({
                companyId: randomCompany.id,
                jobTitleId: randomTitle.id,
                jobFieldId: randomTitle.fieldId!,
                yearsOfExperience: getRandomItem(yearsExpOptions) as any,
                jobNature: getRandomItem(['fullTime', 'remote', 'hybrid']) as any,
                numberOfApplicantsNeeded: Math.floor(Math.random() * 5) + 1,
            });
        }
        const insertedReqs = await db.insert(schema.jobRequirements).values(jobReqsData).returning();
        console.log(`✅ Seeded ${insertedReqs.length} job requirements.`);

        console.log('✨ Seeding complete! Happy testing. ✨');

    } catch (error) {
        console.error('❌ SEEDING FAILED:', error);
    } finally {
        process.exit(0);
    }
}

main();