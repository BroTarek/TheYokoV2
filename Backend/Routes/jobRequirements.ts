import express from 'express';
import {
  getJobRequirements,
  getJobRequirement,
  createJobRequirement,
  updateJobRequirement,
  deleteJobRequirement,
} from '../Infrastructure/Repository/JobRequirementRepository';

const router = express.Router();

router
  .route('/')
  .get(getJobRequirements)
  .post(createJobRequirement);

router
  .route('/:id')
  .get(getJobRequirement)
  .put(updateJobRequirement)
  .patch(updateJobRequirement)
  .delete(deleteJobRequirement);

export default router;

