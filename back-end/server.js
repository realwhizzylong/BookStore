import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(express.json());

app.use('/books', bookRoutes);

app.use('/users', userRoutes);

app.use('/orders', orderRoutes);

app.use(notFound);

app.use(errorHandler);

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${MODE} mode on port ${PORT}`)
);