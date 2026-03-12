import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { referralSources } from "../../Domain/Schemas/ReferralSource";
import { Request, Response } from "express";

const referralSourceRepo = new GenericRepository(referralSources);

export const getReferralSources = asyncHandler(async (req: Request, res: Response) => {
    const result = await referralSourceRepo.getAll(req.query);
    res.status(200).json(result);
});

export const getReferralSource = asyncHandler(async (req: Request, res: Response) => {
    const data = await referralSourceRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Referral Source not found' });
    res.status(200).json({ data });
});

export const createReferralSource = asyncHandler(async (req: Request, res: Response) => {
    const data = await referralSourceRepo.create(req.body);
    res.status(201).json({ data });
});

export const updateReferralSource = asyncHandler(async (req: Request, res: Response) => {
    const data = await referralSourceRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'Referral Source not found' });
    res.status(200).json({ data });
});

export const deleteReferralSource = asyncHandler(async (req: Request, res: Response) => {
    const success = await referralSourceRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Referral Source not found' });
    res.status(204).send();
});