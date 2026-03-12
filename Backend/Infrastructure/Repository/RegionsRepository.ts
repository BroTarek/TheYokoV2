import { asyncHandler } from "../../Utils/asyncHandler";
import { GenericRepository } from "./GenericRepository";
import { regions } from "../../Domain/Schemas/Region";
import { Request, Response } from "express";

const regionRepo = new GenericRepository(regions);

// @desc    Get list of regions
// @route   GET /api/v1/regions
// @access  Public
export const getRegions = asyncHandler(async (req: Request, res: Response) => {
    const result = await regionRepo.getAll(req.query);
    res.status(200).json(result);
});

// @desc    Get specific region by id
// @route   GET /api/v1/regions/:id
// @access  Public
export const getRegion = asyncHandler(async (req: Request, res: Response) => {
    const data = await regionRepo.getById(req.params.id as string);
    if (!data) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json({ data });
});

// @desc    Create region
// @route   POST  /api/v1/regions
// @access  Private/Admin-Manager
export const createRegion = asyncHandler(async (req: Request, res: Response) => {
    const data = await regionRepo.create(req.body);
    res.status(201).json({ data });
});

// @desc    Update specific region
// @route   PUT /api/v1/regions/:id
// @access  Private/Admin-Manager
export const updateRegion = asyncHandler(async (req: Request, res: Response) => {
    const data = await regionRepo.update(req.params.id as string, req.body);
    if (!data) return res.status(404).json({ message: 'Region not found' });
    res.status(200).json({ data });
});

// @desc    Delete specific region
// @route   DELETE /api/v1/regions/:id
// @access  Private/Admin
export const deleteRegion = asyncHandler(async (req: Request, res: Response) => {
    const success = await regionRepo.delete(req.params.id as string);
    if (!success) return res.status(404).json({ message: 'Region not found' });
    res.status(204).send();
});