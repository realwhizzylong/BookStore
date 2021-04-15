import express from 'express';
import { createOrder } from '../controllers/OrderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, createOrder);

export default router;