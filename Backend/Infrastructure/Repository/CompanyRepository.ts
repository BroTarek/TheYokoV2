import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { companies } from "../../Domain/Schemas/Company";
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
    const data = await companyRepo.create(req.body);
    res.status(201).json({ data });
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
    const success = await companyRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Company not found' });
    res.status(204).send();
});