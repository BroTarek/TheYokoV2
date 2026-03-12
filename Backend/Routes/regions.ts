import express from 'express';
import {
    getRegions,
    getRegion,
    createRegion,
    updateRegion,
    deleteRegion,
} from '../Infrastructure/Repository/RegionsRepository';

const router = express.Router();

router
    .route('/')
    .get(getRegions)
    .post(createRegion);

router
    .route('/:id')
    .get(getRegion)
    .put(updateRegion)
    .delete(deleteRegion);

export default router;
