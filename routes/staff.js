import express from 'express';
import { getStaffScreen } from '../controllers/staff.js';
const router = express.Router();

router.get('/', getStaffScreen);

export default router;