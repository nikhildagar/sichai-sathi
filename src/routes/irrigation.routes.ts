import express from 'express';
import * as Controller from '../controllers/irrigation.controller';

const router = express.Router();

router.post('/toggle/:id', Controller.toggleIrrigationState);
router.get('/state/:id', Controller.getIrrigationState);
router.get('/savings/:id', Controller.getWaterSavings);

export default router;
