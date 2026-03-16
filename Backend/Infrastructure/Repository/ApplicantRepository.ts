import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { applicants } from "../../Domain/Schemas/Applicant";
import { applicantRegions } from "../../Domain/Schemas/ApplicantRegion";
import { db } from "../../db";
import { eq, inArray } from "drizzle-orm";
import { Request, Response } from "express";

const applicantRepo = new GenericRepository(applicants);

// Helper to populate applicant relations
const populateApplicantsData = async (applicantsList: any[]) => {
    if (!applicantsList || !applicantsList.length) return applicantsList;
    const applicantIds = applicantsList.map(a => a.id);
    
    const populated = await db.query.applicants.findMany({
        where: inArray(applicants.id, applicantIds),
        with: {
            jobTitle: true,
            jobField: true,
            referralSource: true,
            applicantRegions: {
                with: { region: true }
            }
        }
    });

    const populatedMap = new Map();
    for (const item of populated) {
        (item as any).regions = (item as any).applicantRegions.map((ar: any) => ar.region).filter(Boolean);
        delete (item as any).applicantRegions;
        populatedMap.set(item.id, item);
    }
    
    return applicantsList.map(item => {
        const pop = populatedMap.get(item.id);
        if (pop) return { ...item, ...pop };
        return item;
    });
};

// @desc    Get list of applicants
// @route   GET /api/v1/applicants
// @access  Public
export const getApplicants = asyncHandler(async (req: Request, res: Response) => {
    const result = await applicantRepo.getAll(req.query);
    
    if (req.query.populate) {
        result.data = await populateApplicantsData(result.data);
    }
    
    res.status(200).json(result);
});

// @desc    Get specific applicants by id
// @route   GET /api/v1/applicants/:id
// @access  Public
export const getApplicant = asyncHandler(async (req: Request, res: Response) => {
    const data = await applicantRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Applicant not found' });
    
    if (req.query.populate) {
        const populated = await populateApplicantsData([data]);
        return res.status(200).json({ data: populated[0] });
    }
    
    res.status(200).json({ data });
});

// @desc    Create applicants
// @route   POST  /api/v1/applicants
// @access  Private/Admin-Manager
export const createApplicant = asyncHandler(async (req: Request, res: Response) => {
    const { regions, ...applicantData } = req.body;
    
    const newApplicant = await db.transaction(async (tx) => {
        const result = await tx.insert(applicants).values(applicantData).returning();
        const applicant = result[0];

        if (regions && Array.isArray(regions) && regions.length > 0) {
            const regionInserts = regions.map((regionId: string) => ({
                applicantId: applicant.id,
                regionId
            }));
            await tx.insert(applicantRegions).values(regionInserts);
        }
        return applicant;
    });

    let resData: any = newApplicant;
    if (req.query.populate) {
        const populated = await populateApplicantsData([resData]);
        resData = populated[0];
    }
    res.status(201).json({ data: resData });
});

// @desc    Update specific applicants
// @route   PUT /api/v1/applicants/:id
// @access  Private/Admin-Manager
export const updateApplicant = asyncHandler(async (req: Request, res: Response) => {
    const { regions, ...applicantData } = req.body;
    
    const updatedApplicant = await db.transaction(async (tx) => {
        let applicant;
        if (Object.keys(applicantData).length > 0) {
            const updatePayload = { ...applicantData, updatedAt: new Date() };
            const result = await tx.update(applicants)
                .set(updatePayload)
                .where(eq(applicants.id, req.params.id as string))
                .returning();
            applicant = result[0];
        } else {
            const result = await tx.select().from(applicants).where(eq(applicants.id, req.params.id as string));
            applicant = result[0];
        }
        
        if (!applicant) return null;

        if (regions && Array.isArray(regions)) {
            await tx.delete(applicantRegions).where(eq(applicantRegions.applicantId, applicant.id));
            if (regions.length > 0) {
                const regionInserts = regions.map((regionId: string) => ({
                    applicantId: applicant.id,
                    regionId
                }));
                await tx.insert(applicantRegions).values(regionInserts);
            }
        }
        return applicant;
    });

    if (!updatedApplicant) return res.status(404).json({ message: 'Applicant not found' });
    
    let resData: any = updatedApplicant;
    if (req.query.populate) {
        const populated = await populateApplicantsData([resData]);
        resData = populated[0];
    }
    
    res.status(200).json({ data: resData });
});

// @desc    Delete specific applicants
// @route   DELETE /api/v1/applicants/:id
// @access  Private/Admin
export const deleteApplicant = asyncHandler(async (req: Request, res: Response) => {
    // Delete relations first as junction tables have foreign key constraints
    await db.delete(applicantRegions).where(eq(applicantRegions.applicantId, req.params.id as string));
    
    const success = await applicantRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Applicant not found' });
    res.status(204).send();
});