import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    role: [String],
    name: String,
    phone: String,
    email: String,
    schedule: {
        type: [String],
        required: false
    }
})

export const User = mongoose.model('user', userSchema);