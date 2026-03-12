import express from 'express';
import {
  getJobTitles,
  getJobTitle,
  createJobTitle,
  updateJobTitle,
  deleteJobTitle,
} from '../Infrastructure/Repository/JobTitleRepository';

const router = express.Router();

router
  .route('/')
  .get(getJobTitles)
  .post(createJobTitle);

router
  .route('/:id')
  .get(getJobTitle)
  .put(updateJobTitle)
  .delete(deleteJobTitle);

export default router;