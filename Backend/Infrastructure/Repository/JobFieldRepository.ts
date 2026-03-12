import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { jobFields } from "../../Domain/Schemas/JobField";
import { Request, Response } from "express";

const jobFieldRepo = new GenericRepository(jobFields);

export const getJobFields = asyncHandler(async (req: Request, res: Response) => {
    const result = await jobFieldRepo.getAll(req.query);
    res.status(200).json(result);
});

export const getJobField = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobFieldRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'JobField not found' });
    res.status(200).json({ data });
});

export const createJobField = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobFieldRepo.create(req.body);
    res.status(201).json({ data });
});

export const updateJobField = asyncHandler(async (req: Request, res: Response) => {
    const data = await jobFieldRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'JobField not found' });
    res.status(200).json({ data });
});

export const deleteJobField = asyncHandler(async (req: Request, res: Response) => {
    const success = await jobFieldRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'JobField not found' });
    res.status(204).send();
});