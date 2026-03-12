import express from 'express';
import {
    getReferralSources,
    getReferralSource,
    createReferralSource,
    updateReferralSource,
    deleteReferralSource,
} from '../Infrastructure/Repository/ReferralSourceRepository';

const router = express.Router();

router
    .route('/')
    .get(getReferralSources)
    .post(createReferralSource);

router
    .route('/:id')
    .get(getReferralSource)
    .put(updateReferralSource)
    .delete(deleteReferralSource);

export default router;
