import express from 'express';
import * as Controller from '../controllers/soil.controllers';

const router = express.Router();

router.post('/report/:id', Controller.getSoilAnalysisReport);
router.post('/save', Controller.addSoilAnalysis);

export default router;
