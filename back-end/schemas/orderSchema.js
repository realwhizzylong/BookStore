import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItems: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Book'
                },
                title: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                price: {
                    type: String,
                    required: true
                }
            }
        ],
        shippingAddress: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipcode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentResult: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            update_time: {
                type: String,
            },
            email_address: {
                type: String,
            }
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false
        },
        deliveredAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema);

export default Order;