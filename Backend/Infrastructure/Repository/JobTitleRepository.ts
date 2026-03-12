import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { jobTitles } from "../../Domain/Schemas/JobTitle";
import { Request, Response } from "express";

const jobTitleRepo = new GenericRepository(jobTitles);

export const getJobTitles = asyncHandler(async (req: Request, res: Response) => {
    const result = await jobTitleRepo.getAll(req.query);
    res.status(200).json(result);
});

export const getJobTitle = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobTitleRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Job Title not found' });
    res.status(200).json({ data });
});

export const createJobTitle = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobTitleRepo.create(req.body);
    res.status(201).json({ data });
});

export const updateJobTitle = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobTitleRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'Job Title not found' });
    res.status(200).json({ data });
});

export const deleteJobTitle = asyncHandler(async (req: Request, res: Response) => {
    const success = await jobTitleRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Job Title not found' });
    res.status(204).send();
});