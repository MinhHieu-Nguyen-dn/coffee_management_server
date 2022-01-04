import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import managerRoutes from './routes/manager.js';
import staffRoutes from './routes/staff.js';

import { config } from 'dotenv';

config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/staff', staffRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Landing page of coffee management webapp',
    })
})

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT);
    })
    .catch((err) => console.log(err));