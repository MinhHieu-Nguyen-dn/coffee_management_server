import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    isActive: Boolean,
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
    number: Number
})

export const Table = mongoose.model('table', tableSchema);