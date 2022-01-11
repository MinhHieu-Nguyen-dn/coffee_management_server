import express from 'express';
import {
    getStaffScreen,
    viewAllTables,
    viewAllDrinks,

    createNewUser,
    createNewTable,
    createNewDrink,

    viewTableStatus,
    changeTableStatus,

    addDrinkToTable,
    showTableOrderList,
    updateTableOrderList,

    printInvoice,

    getDrinkInfo
} from '../controllers/staff.js';
const router = express.Router();

// view
router.get('/', getStaffScreen);
router.get('/allTables', viewAllTables);
router.get('/allDrinks', viewAllDrinks);

// create
router.post('/createNewUser', createNewUser);
router.post('/createNewTable', createNewTable);
router.post('/createNewDrink', createNewDrink);

// interact with tables
router.post('/viewTableStatus', viewTableStatus);
router.post('/changeTableStatus', changeTableStatus);

// interact with orderLists
router.post('/addDrinkToTable', addDrinkToTable);
router.post('/showTableOrderList', showTableOrderList);
router.post('/updateTableOrderList', updateTableOrderList);

// interact with bills
router.post('/printInvoice', printInvoice);

router.post('/getDrinkInfo', getDrinkInfo);

export default router;