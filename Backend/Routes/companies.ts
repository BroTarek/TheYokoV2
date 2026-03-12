import express from 'express';
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
} from '../Infrastructure/Repository/CompanyRepository';

const router = express.Router();

router
  .route('/')
  .get(getCompanies)
  .post(createCompany);

router
  .route('/:id')
  .get(getCompany)
  .put(updateCompany)
  .patch(updateCompany)
  .delete(deleteCompany);


export default router;