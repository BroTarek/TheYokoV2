import { Express } from 'express';
import applicantRouter from './applicants';
import companyRouter from './companies';
import fieldRouter from './fields';
import titleRouter from './titles';
import jobRequirementRouter from './jobRequirements';
import regionsRouter from './regions';
import referralSourceRouter from './referralSources';

const mountRoutes = (app: Express) => {
  app.use('/api/applicants', applicantRouter);
  app.use('/api/companies', companyRouter);
  app.use('/api/fields', fieldRouter);
  app.use('/api/titles', titleRouter);
  app.use('/api/job-requirements', jobRequirementRouter);
  app.use('/api/regions', regionsRouter);
  app.use('/api/referral-sources', referralSourceRouter);
};

export default mountRoutes;
