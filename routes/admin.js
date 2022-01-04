import express from 'express';
import { getAdminDashboard, getAddUser, postAddUser, getEditUser, postEditUser } from '../controllers/admin.js';
const router = express.Router();

router.get('/', getAdminDashboard);

router.get('/add-user', getAddUser);
router.post('add-user', postAddUser);

router.get('/edit-user/:_id', getEditUser);
router.post('/edit-user/:_id', postEditUser);

export default router;