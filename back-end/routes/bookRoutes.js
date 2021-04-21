import express from 'express';
import { getBooks, getBookById, getMyBooks, createBook, updateBookById, deleteBookById, addReview } from '../controllers/BookController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);

router.post('/', protectedRoute, createBook);

router.get('/mybooks', protectedRoute, getMyBooks);

router.post('/:id/reviews', protectedRoute, addReview);

router.get('/:id', getBookById);

router.put('/:id', protectedRoute, updateBookById);

router.delete('/:id', protectedRoute, deleteBookById);

export default router;