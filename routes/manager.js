import exp from 'constants';
import express from 'express';
import { getManagerDashboard, getSchedule, getEditUser, postEditUser } from '../controllers/manager.js';
const router = express.Router();

router.get('/', getManagerDashboard);

router.get('/schedule', getSchedule);

router.get('/edit-user/:_id', getEditUser);
router.post('/edit-user/:_id', postEditUser);

export default router;