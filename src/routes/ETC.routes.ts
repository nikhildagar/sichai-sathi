import express from 'express';
import * as ETCController from '../controllers/ETC.controller';

const router = express.Router();

router.post('/predict', ETCController.ETChandler);

export default router;
