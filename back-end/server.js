import express from 'express';
import dotenv from 'dotenv';
import books from './data/books.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(p => p._id === req.params.id);
    res.json(book);
});

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${MODE} mode on port ${PORT}`)
);