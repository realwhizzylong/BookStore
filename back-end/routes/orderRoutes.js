import express from 'express';
import { createOrder, getMyOrders, getOrderById, updateOrderToPaid } from '../controllers/OrderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, createOrder);

router.get('/myorders', protectRoute, getMyOrders);

router.get('/:id', protectRoute, getOrderById);

router.put('/:id/pay', protectRoute, updateOrderToPaid);

export default router;