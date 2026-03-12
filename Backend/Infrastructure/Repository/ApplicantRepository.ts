import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { applicants } from "../../Domain/Schemas/Applicant";
import { Request, Response } from "express";

const applicantRepo = new GenericRepository(applicants);

// @desc    Get list of applicants
// @route   GET /api/v1/applicants
// @access  Public
export const getApplicants = asyncHandler(async (req: Request, res: Response) => {
    const result = await applicantRepo.getAll(req.query);
    res.status(200).json(result);
});

// @desc    Get specific applicants by id
// @route   GET /api/v1/applicants/:id
// @access  Public
export const getApplicant = asyncHandler(async (req: Request, res: Response) => {
    const data = await applicantRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Applicant not found' });
    res.status(200).json({ data });
});

// @desc    Create applicants
// @route   POST  /api/v1/applicants
// @access  Private/Admin-Manager
export const createApplicant = asyncHandler(async (req: Request, res: Response) => {
    const data = await applicantRepo.create(req.body);
    res.status(201).json({ data });
});

// @desc    Update specific applicants
// @route   PUT /api/v1/applicants/:id
// @access  Private/Admin-Manager
export const updateApplicant = asyncHandler(async (req: Request, res: Response) => {
    const data = await applicantRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'Applicant not found' });
    res.status(200).json({ data });
});

// @desc    Delete specific applicants
// @route   DELETE /api/v1/applicants/:id
// @access  Private/Admin
export const deleteApplicant = asyncHandler(async (req: Request, res: Response) => {
    const success = await applicantRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Applicant not found' });
    res.status(204).send();
});