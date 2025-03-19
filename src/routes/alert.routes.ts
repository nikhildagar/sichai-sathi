import express from 'express';
import { createAlert, getAlerts } from '../controllers/alert.controllers';

const router = express.Router();

router.post('/create', createAlert);
router.get('/:farmerId', getAlerts);

export default router;
