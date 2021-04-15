import asyncHandler from 'express-async-handler';
import Order from '../schemas/orderSchema.js';

export const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(200);
        res.json(createdOrder);
    }
})