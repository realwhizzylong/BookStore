import express from 'express';
import { createOrder, getSellerOrders, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } from '../controllers/OrderController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectedRoute, createOrder);

router.get('/sellerorders', protectedRoute, getSellerOrders);

router.get('/myorders', protectedRoute, getMyOrders);

router.get('/:id', protectedRoute, getOrderById);

router.put('/:id/pay', protectedRoute, updateOrderToPaid);

router.put('/:id/deliver', protectedRoute, updateOrderToDelivered);

export default router;