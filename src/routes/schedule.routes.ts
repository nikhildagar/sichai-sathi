
import express from 'express';
import * as ScheduleController from '../controllers/schedule.controller';

const router = express.Router();

router.post('/', ScheduleController.createSchedule);
router.get('/:farmerId', ScheduleController.getSchedules);
router.put('/:id', ScheduleController.updateSchedule);
router.delete('/:id', ScheduleController.deleteSchedule);

export default router;
