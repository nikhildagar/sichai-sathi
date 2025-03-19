import express from 'express';
import * as FarmerController from '../controllers/farmer.controller';

const router = express.Router();

router.post('/signup', FarmerController.createFarmer);
router.post('/login', FarmerController.loginFarmer);
router.get('/:id', FarmerController.getFarmers);

export default router;
