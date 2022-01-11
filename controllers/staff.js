import { User } from '../models/user.js';
import { Table } from '../models/table.js';
import { Drink } from '../models/drink.js';
import { Bill } from '../models/bill.js';
import mongoose from 'mongoose';
import { OK, NOT_FOUND, FAIL } from '../shared/response.js';

// view
const getStaffScreen = async (req, res) => {
    return res.json(OK([]));
}

const viewAllTables = async (req, res) => {
    try {
        const allTables = await Table.find();
        return res.json(OK([allTables]));
    } catch (e) {
        return res.json(FAIL([]))
    }
}

const viewAllDrinks = async (req, res) => {
    try {
        const allDrinks = await Drink.find();
        return res.json(OK([allDrinks]));
    } catch (e) {
        return res.json(FAIL([]))
    }
}

// create

const createNewUser = async (req, res) => {
    const bodyData = req.body;
    const { role, name, phone, email } = bodyData;

    const newUser = new User({
        role: role,
        name: name,
        phone: phone,
        email: email
    });

    try {
        const createUser = await User.create(newUser);
        return res.json(OK([createUser]));
    } catch (e) {
        return res.json(FAIL([]));
    }
}

const createNewTable = async (req, res) => {
    const bodyData = req.body;
    const { tableNumber } = bodyData;

    const newTable = new Table({
        isActive: false,
        orderList: [],
        number: tableNumber
    });

    try {
        const createTable = await Table.create(newTable);
        return res.json(OK([createTable]));
    } catch (e) {
        return res.json(FAIL([]));
    }
}

const createNewDrink = async (req, res) => {
    const bodyData = req.body;
    const { name, type, price, imgUrl, available } = bodyData;
    const newDrink = new Drink({
        name: name,
        type: type,
        price: price,
        imgUrl: imgUrl,
        available: available,
    });

    try {
        const result = await Drink.create(newDrink);
        return res.json(OK([result]));
    } catch (e) {
        return res.json(FAIL([]));
    }
};

// interact with tables

const viewTableStatus = async (req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;

    try {
        const table = await Table.findOne({ _id: tableId });

        const isActive = table.isActive;
        const orderList = table.orderList;

        return res.json(OK([isActive, orderList]));
    } catch (e) {
        return res.json(NOT_FOUND([]));
    }
}

const changeTableStatus = async (req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;

    try {
        const oldTable = await Table.findOne({ _id: tableId });

        const updateTable = await Table.findOneAndUpdate(
            { _id: tableId },
            { isActive: !oldTable.isActive },
            { new: true }
        );

        const isActive = updateTable.isActive;

        return res.json(OK([isActive]));
    } catch (e) {
        return res.json(FAIL([]));
    }
}

// interact with orderLists

const addDrinkToTable = async (req, res, next) => {
    const bodyData = req.body;
    let { tableId, drinkId, count } = bodyData;

    try {
        const findTable = await Table.findById(tableId);
        if (!findTable) {
            return res.json(NOT_FOUND([]));
        }
        if (findTable.isActive == false) {
            findTable.isActive = true;
            findTable.save();
        }

        const findDrink = await Drink.findById(drinkId);
        if (!findDrink) {
            return res.json(NOT_FOUND([]));
        }

        let drinkIndex = findTable.orderList.findIndex((p) => p.drink == drinkId);

        if (drinkIndex > -1) {
            let drink = findTable.orderList[drinkIndex];
            drink.quantity += count;
            findTable.orderList[drinkIndex] = drink;
            findTable.save();
        } else {
            const drinkToAdd = Object({
                drink: findDrink._id,
                name: findDrink.name,
                category: findDrink.category,
                price: findDrink.price,
                imgUrl: findDrink.imgUrl,
                available: findDrink.available,
                quantity: count,
            });
            findTable.orderList.push(drinkToAdd);
            findTable.save();
        }
        return res.json(OK([findTable]));
    } catch (e) {
        return res.json(FAIL([]));
    }
};

const showTableOrderList = async (req, res) => {
    const bodyData = req.body;
    const tableId = bodyData.tableId;

    try {
        const table = await Table.findOne({ _id: tableId });

        const orderList = table.orderList;
        return res.json(OK([orderList]));
    } catch (e) {
        return res.json(FAIL([]));
    }
}

const updateTableOrderList = async (req, res) => {
    const bodyData = req.body;
    const { tableId, newOrderList } = bodyData;

    try {
        const updateTable = await Table.findOneAndUpdate(
            { _id: tableId },
            { orderList: newOrderList },
            { new: true }
        );
        const orderList = updateTable.orderList;
        return res.json(OK([orderList]));
    } catch (e) {
        return res.json(FAIL([]));
    }
}

// interact with bills

const printInvoice = async (req, res) => {
    const bodyData = req.body;
    const { tableId, staffId } = bodyData;

    try {
        const currentTime = Date.now();
        const dateObject = new Date(currentTime);
        const currentDay = dateObject.getDate();
        const currentMonth = dateObject.getMonth() + 1;
        const currentYear = dateObject.getFullYear();
        const currentHour = dateObject.getHours();
        const currentMinute = dateObject.getMinutes();
        const currentSecond = dateObject.getSeconds();

        const billTime = currentDay.toString() + '-' + currentMonth.toString() + '-' + currentYear.toString() + ' ' + currentHour.toString() + ':' + currentMinute.toString() + ':' + currentSecond.toString()

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

        const newBill = new Bill({
            table: tableId,
            time: billTime,
            orderList: payList,
            total: bill,
            staff: staffId,
        });
        newBill.save();

        const resetTable = await Table.findOneAndUpdate(
            { _id: tableId },
            { isActive: !table.isActive, orderList: [] },
            { new: true }
        );

        return res.json(OK([newBill]));
    } catch (e) {
        return res.json(FAIL([]));
    }

}

const getDrinkInfo = async (req, res) => {
    const bodyData = req.body;
    const drinkId = bodyData.drinkId;

    try {
        const drink = await Drink.findOne({ _id: drinkId });
        return res.json(OK([drink]));
    } catch (e) {
        return res.json(NOT_FOUND([]));
    }
}

export {
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
};