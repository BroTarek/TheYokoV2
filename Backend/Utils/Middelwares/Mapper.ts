// private async mapToEntity(data: any): Promise<Applicant> {
//         // Fetch related entities — guard against null IDs and dangling FKs
//         const safeGet = async <T>(fn: () => Promise<T | null>): Promise<T | null> => {
//             try { return await fn(); } catch { return null; }
//         };

//         const jobTitle = data.jobTitleId
//             ? await safeGet(() => this.jobTitleService.get(data.jobTitleId))
//             : null;
//         const referralSource = data.referralSourceId
//             ? await safeGet(() => this.referralSourceService.get(data.referralSourceId))
//             : null;
//         const jobField = data.jobFieldId
//             ? await safeGet(() => this.jobFieldService.get(data.jobFieldId))
//             : null;

//         // Fetch regions for this applicant — skip orphaned region IDs gracefully
//         const regionResults = await safeGet(() =>
//             db.select({ regionId: applicantRegions.regionId })
//                 .from(applicantRegions)
//                 .where(eq(applicantRegions.applicantId, data.id))
//         ) ?? [];

//         const regions = await Promise.all(
//             regionResults.map(r => safeGet(() => this.regionService.get(r.regionId)))
//         );

//         return new Applicant({
//             id: data.id,
//             first_name: data.firstName,
//             last_name: data.lastName,
//             phone: data.phone,
//             email: data.email || '',
//             years_of_experience: ['0-5', '5-10', '10+'].includes(data.yearsOfExperience) ? data.yearsOfExperience : '0-5' as YearsOfExperience,
//             jobTitle: jobTitle ?? undefined,
//             jobField: jobField ?? undefined,
//             referralSource: referralSource ?? undefined,
//             status: ['unseen', 'seen', 'reviewed', 'selected', 'done'].includes(data.status) ? data.status : 'unseen',
//             regions: regions.filter((r): r is NonNullable<typeof r> => r !== null),
//             experience_description: data.experienceDescription || '',
//             google_drive_url: data.googleDriveUrl || '',
//             last_company: data.lastCompany || '',
//             application_date: data.applicationDate || new Date(),
//             created_at: data.createdAt || new Date(),
//             updated_at: data.updatedAt || new Date(),
//             is_archived: data.isArchived || false,
//         });
//     }

//  private async mapToEntity(data: any): Promise<Company> {
//         const company = new Company({
//             id: data.id,
//             name: data.name,
//             description: data.description || '',
//             is_archived: data.isArchived || false,
//             created_at: data.createdAt || new Date(),
//         });

//         // Fetch job requirements using a specific method that doesn't trigger recursion
//         const jrService = new JobRequirementService();
//         // Pass a simplified version of company to avoid full recursion if needed, 
//         // but here we just need to break the cycle by not calling .get() again.
//         company.jobRequirements = await jrService.getByCompanyId(data.id, company);

//         return company;
//     }

//  async mapToEntity(data: any, company?: any): Promise<JobRequirement> {
//         const jobTitleService = new JobTitleService();
//         const jobFieldService = new JobFieldService();
//         const jobTitle = await jobTitleService.get(data.jobTitleId);

//         const jobField = await jobFieldService.get(data.jobFieldId);

//         let companyEntity = company;
//         if (!companyEntity) {
//             const companyService = new CompanyService();
//             companyEntity = await companyService.get(data.companyId);
//         }

//         // Fetch regions
//         const regionResults = await db.select({ regionId: jobRequirementRegions.regionId })
//             .from(jobRequirementRegions)
//             .where(eq(jobRequirementRegions.jobRequirementId, data.id));

//         const regionService = new RegionService();
//         const regions = await Promise.all(regionResults.map(r => regionService.get(r.regionId)));

//         return new JobRequirement({
//             id: data.id,
//             company: companyEntity || undefined,
//             jobTitle: jobTitle || undefined,
//             jobField: jobField || undefined,
//             yearsOfExperience: data.yearsOfExperience as any,
//             jobNature: data.jobNature as any,
//             desiredRegions: regions.filter((r): r is any => r !== null),
//             numberOfApplicantsNeeded: data.numberOfApplicantsNeeded,
//             numberOfApplicantsSelected: data.numberOfApplicantsSelected || 0,
//             created_at: data.createdAt || new Date(),
//         });
//     }


