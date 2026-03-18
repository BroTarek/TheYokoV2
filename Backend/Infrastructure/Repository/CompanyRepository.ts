import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { companies } from "../../Domain/Schemas/Company";
import { jobRequirements } from "../../Domain/Schemas/JobRequirement";
import { jobRequirementRegions } from "../../Domain/Schemas/JobRequirementRegion";
import { db } from "../../db";
import { eq, inArray } from "drizzle-orm";
import { Request, Response } from "express";

const companyRepo = new GenericRepository(companies);

// @desc    Get list of Companies
// @route   GET /api/v1/companies
// @access  Public
export const getCompanies = asyncHandler(async (req: Request, res: Response) => {
    const result = await companyRepo.getAll(req.query);
    res.status(200).json(result);
});

// @desc    Get specific Company by id
// @route   GET /api/v1/companies/:id
// @access  Public
export const getCompany = asyncHandler(async (req: Request, res: Response) => {
    const data = await companyRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ data });
});

// @desc    Create Company
// @route   POST  /api/v1/companies
// @access  Private/Admin-Manager
export const createCompany = asyncHandler(async (req: Request, res: Response) => {
    const { jobRequirements: requirements, ...companyData } = req.body;

    const newCompany = await db.transaction(async (tx) => {
        // 1. Create Company
        const [company] = await tx.insert(companies).values(companyData).returning();

        // 2. Create Job Requirements if provided
        if (requirements && Array.isArray(requirements)) {
            for (const reqItem of requirements) {
                const { desiredRegions, ...reqData } = reqItem;
                
                // Assign companyId to the requirement
                const [jobReq] = await tx.insert(jobRequirements).values({
                    ...reqData,
                    companyId: company.id
                }).returning();

                // 3. Create regions for this requirement if provided
                if (desiredRegions && Array.isArray(desiredRegions)) {
                    const regionInserts = desiredRegions.map((r: any) => ({
                        jobRequirementId: jobReq.id,
                        regionId: r.id
                    }));
                    if (regionInserts.length > 0) {
                        await tx.insert(jobRequirementRegions).values(regionInserts);
                    }
                }
            }
        }
        return company;
    });

    res.status(201).json({ data: newCompany });
});

// @desc    Update specific Company
// @route   PUT /api/v1/companies/:id
// @access  Private/Admin-Manager
export const updateCompany = asyncHandler(async (req: Request, res: Response) => {
    const data = await companyRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ data });
});

// @desc    Delete specific Company
// @route   DELETE /api/v1/companies/:id 
// @access  Private/Admin
export const deleteCompany = asyncHandler(async (req: Request, res: Response) => {
    const companyId = req.params.id as string;
    
    await db.transaction(async (tx) => {
        // 1. Get all job requirements for this company
        const companyReqs = await tx.select({ id: jobRequirements.id }).from(jobRequirements).where(eq(jobRequirements.companyId, companyId));
        const reqIds = companyReqs.map(r => r.id);

        if (reqIds.length > 0) {
            // 2. Delete regions for these requirements
            await tx.delete(jobRequirementRegions).where(inArray(jobRequirementRegions.jobRequirementId, reqIds));
            
            // 3. Delete the job requirements
            await tx.delete(jobRequirements).where(inArray(jobRequirements.id, reqIds));
        }

        // 4. Delete the company
        await tx.delete(companies).where(eq(companies.id, companyId));
    });

    res.status(204).send();
});