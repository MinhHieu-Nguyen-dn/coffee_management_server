import { timeStamp } from 'console';
import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table'
    },
    time: String,
    total: Number,
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

export const Bill = mongoose.model('bill', billSchema);