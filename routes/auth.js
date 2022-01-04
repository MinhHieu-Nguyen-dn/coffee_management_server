import express from 'express';
import { getLogin, postLogin, getForgotPassword, postForgotPassword, getTempPassword, postTempPassword, getResetPassword, postResetPassword } from '../controllers/auth.js';
const router = express.Router();

router.get('/login', getLogin);
router.post('login', postLogin);

router.get('/forgot-password', getForgotPassword);
router.post('/forgot-password', postForgotPassword);

router.get('/temp-password', getTempPassword);
router.post('/temp-password', postTempPassword);

router.get('/reset-password', getResetPassword);
router.post('/reset-password', postResetPassword);


export default router;