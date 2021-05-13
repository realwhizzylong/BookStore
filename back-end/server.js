import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/books', bookRoutes);

app.use('/users', userRoutes);

app.use('/orders', orderRoutes);

app.use('/upload', uploadRoutes);

app.get('/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/front-end/build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

app.use(notFound);

app.use(errorHandler);

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${MODE} mode on port ${PORT}`)
);