import { User } from '../models/user.js';
import { Table } from '../models/table.js';
import { Drink } from '../models/drink.js';
import { Bill } from '../models/bill.js';
import mongoose from 'mongoose';

const getStaffScreen = async(req, res) => {
    return res.json({
        message: 'This is the staff screen!'
    })
}

const chooseTable = async(req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;

    const table = await Table.findOne({ _id: tableId });

    const isActive = table.isActive;
    const orderList = table.orderList;

    return res.json({
        isActive,
        orderList
    })
}

const changeTableStatus = async(req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;

    const oldTable = await Table.findOne({ _id: tableId });

    const updateTable = await Table.findOneAndUpdate(
        { _id: tableId },
        { isActive: !oldTable.isActive },
        { new: true }
    );

    const isActive = updateTable.isActive;

    return res.json({
        isActive
    })
}

const printInvoice = async(req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;
    const time = bodyData.time;
    const staffId = bodyData.staffId;

    const table = await Table.findOne({ _id: tableId });
    const payList = table.orderList;

    var bill = 0;

    const payDetails = await Promise.all(
        payList.map((drink) => {
            const drinkId = drink.drink;
            return Drink.findOne({ _id: drinkId });
        })
    )

    var index = 0;

    payList.forEach((drink) => {
        const drinkQuantity = drink.quantity;
        const drinkPrice = payDetails[index].price;
        bill = bill + drinkQuantity * drinkPrice;
        index = index + 1;
    })

    const newBill = new Bill({ table: tableId, time: time, total: bill, staff: staffId });
    newBill.save();

    const resetTable = await Table.findOneAndUpdate(
        { _id: tableId },
        { isActive: !table.isActive, orderList: [] },
        { new: true }
    );

    const staff = await User.findOne({ _id: staffId });
    const staffName = staff.name;

    return res.json({
        payList,
        payDetails,
        staffName,
        billDetails: newBill
    })
}

const showTableOrderList = async(req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;

    const table = await Table.findOne({ _id: tableId });

    const orderList = table.orderList;

    return res.json({
        orderList
    })
}

const updateTableOrderList = async(req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;
    const newOrderList = bodyData.newOrderList;

    const updateTable = await Table.findOneAndUpdate(
        { _id: tableId },
        { orderList: newOrderList },
        { new: true}
    );

    const orderList = updateTable.orderList;

    return res.json({
        orderList
    })
}

export { getStaffScreen, chooseTable, changeTableStatus, printInvoice, showTableOrderList, updateTableOrderList };