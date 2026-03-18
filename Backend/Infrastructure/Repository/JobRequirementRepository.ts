import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { jobRequirements } from "../../Domain/Schemas/JobRequirement";
import { jobRequirementRegions } from "../../Domain/Schemas/JobRequirementRegion";
import { db } from "../../db";
import { eq, inArray } from "drizzle-orm";
import { Request, Response } from "express";

const jobRequirementRepo = new GenericRepository(jobRequirements);

// Helper to populate job requirement relations
const populateJobRequirementsData = async (jobRequirementsList: any[]) => {
    if (!jobRequirementsList || !jobRequirementsList.length) return jobRequirementsList;
    const jrIds = jobRequirementsList.map(jr => jr.id);
    
    const populated = await db.query.jobRequirements.findMany({
        where: inArray(jobRequirements.id, jrIds),
        with: {
            jobTitle: true,
            jobField: true,
            company: true,
            jobRequirementRegions: {
                with: { region: true }
            }
        }
    });

    const populatedMap = new Map();
    for (const item of populated) {
        (item as any).desiredRegions = (item as any).jobRequirementRegions.map((jrr: any) => jrr.region).filter(Boolean);
        delete (item as any).jobRequirementRegions;
        populatedMap.set(item.id, item);
    }
    
    return jobRequirementsList.map(item => {
        const pop = populatedMap.get(item.id);
        if (pop) return { ...item, ...pop };
        return item;
    });
};

export const getJobRequirements = asyncHandler(async (req: Request, res: Response) => {
    const result = await jobRequirementRepo.getAll(req.query);
    
    if (req.query.populate) {
        result.data = await populateJobRequirementsData(result.data);
    }
    
    res.status(200).json(result);
});

export const getJobRequirement = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobRequirementRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Job Requirement not found' });
    
    if (req.query.populate) {
        const populated = await populateJobRequirementsData([data]);
        return res.status(200).json({ data: populated[0] });
    }
    
    res.status(200).json({ data });
});

export const createJobRequirement = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobRequirementRepo.create(req.body);
    res.status(201).json({ data });
});

export const updateJobRequirement = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobRequirementRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'Job Requirement not found' });
    res.status(200).json({ data });
});

export const deleteJobRequirement = asyncHandler(async (req: Request, res: Response) => {
    const success = await jobRequirementRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Job Requirement not found' });
    res.status(204).send();
});