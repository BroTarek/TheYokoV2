import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { jobRequirements } from "../../Domain/Schemas/JobRequirement";
import { Request, Response } from "express";

const jobRequirementRepo = new GenericRepository(jobRequirements);

export const getJobRequirements = asyncHandler(async (req: Request, res: Response) => {
    const result = await jobRequirementRepo.getAll(req.query);
    res.status(200).json(result);
});

export const getJobRequirement = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobRequirementRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Job Requirement not found' });
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