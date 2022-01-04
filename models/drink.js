import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
    name: String,
    price: Number,
    available: Boolean
})

export const Drink = mongoose.model('drink', drinkSchema);