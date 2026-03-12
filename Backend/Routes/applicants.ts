import express from 'express';
import {
  getApplicants,
  getApplicant,
  createApplicant,
  updateApplicant,
  deleteApplicant,
} from '../Infrastructure/Repository/ApplicantRepository';

const router = express.Router();

router
  .route('/')
  .get(getApplicants)
  .post(createApplicant);

router
  .route('/:id')
  .get(getApplicant)
  .put(updateApplicant)
  .patch(updateApplicant)
  .delete(deleteApplicant);


export default router;