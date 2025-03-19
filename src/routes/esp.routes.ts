import express from 'express';
import * as ESPController from '../controllers/esp.controllers';
const router = express.Router();

router.post('/getSensorData', ESPController.getSensorData);
router.post('/resetAlertLimit', ESPController.resetNotificationLimit);

export default router;
