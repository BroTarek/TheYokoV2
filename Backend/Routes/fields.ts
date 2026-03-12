import express from 'express';
import {
  getJobFields,
  getJobField,
  createJobField,
  updateJobField,
  deleteJobField,
} from '../Infrastructure/Repository/JobFieldRepository';

const router = express.Router();

router
  .route('/')
  .get(getJobFields)
  .post(createJobField);

router
  .route('/:id')
  .get(getJobField)
  .put(updateJobField)
  .patch(updateJobField)
  .delete(deleteJobField);


export default router;