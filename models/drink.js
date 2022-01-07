import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    imgUrl: String,
    available: Boolean
})

export const Drink = mongoose.model('drink', drinkSchema);