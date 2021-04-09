import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema);

export default Book;