import express from 'express';
import { getStaffScreen, chooseTable, changeTableStatus, printInvoice, showTableOrderList, updateTableOrderList } from '../controllers/staff.js';
const router = express.Router();

router.get('/', getStaffScreen);

router.post('/chooseTable', chooseTable);

router.post('/changeTableStatus', changeTableStatus);

router.post('/printInvoice', printInvoice);

router.post('/showTableOrderList', showTableOrderList);

router.post('/updateTableOrderList', updateTableOrderList);


export default router;