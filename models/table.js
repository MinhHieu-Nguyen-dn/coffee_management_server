import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    status: Boolean,
    isChosen: Boolean,
    orderList: [Object({
        drink: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'drink'
        },
        quantity: Number
    })],
    number: Number
})

export const Table = mongoose.model('table', tableSchema);