import express from 'express';
import { createOrder, getMyOrders, getOrderById, updateOrderToPaid } from '../controllers/OrderController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectedRoute, createOrder);

router.get('/myorders', protectedRoute, getMyOrders);

router.get('/:id', protectedRoute, getOrderById);

router.put('/:id/pay', protectedRoute, updateOrderToPaid);

export default router;