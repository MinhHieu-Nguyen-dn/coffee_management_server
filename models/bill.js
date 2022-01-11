import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table'
    },
    time: String,
    orderList: [Object({
        drink: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'drink'
        },
        name: String,
        category: String,
        price: Number,
        imgUrl: String,
        available: Boolean,
        quantity: Number,
        _id: false
    })],
    total: Number,
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

export const Bill = mongoose.model('bill', billSchema);