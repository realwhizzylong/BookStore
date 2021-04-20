import asyncHandler from 'express-async-handler';
import Book from '../schemas/bookSchema.js';

export const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({});
    res.json(books);
})

export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found')
    }
})

export const createBook = asyncHandler(async (req, res) => {
    const book = new Book({
        user: req.user._id,
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        author: req.body.author,
        category: req.body.category,
        condition: req.body.condition
    })
    const createdBook = await book.save();
    res.status(201);
    res.json(createdBook);
})

export const updateBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        book.title = req.body.title || book.title;
        book.price = req.body.price || book.price;
        book.image = req.body.image || book.image;
        book.author = req.body.author || book.author;
        book.category = req.body.category || book.category;
        book.condition = req.body.condition || book.condition;
        const updatedBook = await book.save();
        res.json({
            _id: updatedBook._id,
            title: updatedBook.title,
            price: updatedBook.price,
            author: updatedBook.author,
            category: updatedBook.category,
            condition: updatedBook.condition
        })
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
})

export const deleteBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        await book.remove();
        res.json({ message: 'Book removed' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
})