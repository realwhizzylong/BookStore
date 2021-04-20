import dotenv from 'dotenv';
import books from './data/books.js';
import users from './data/users.js';
import Book from './schemas/bookSchema.js';
import User from './schemas/userSchema.js';
import Order from './schemas/orderSchema.js';
import Review from './schemas/reviewSchema.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Book.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        const allUsers = await User.insertMany(users);
        const user = allUsers[0];
        const sampleBooks = books.map(book => {
            return { ...book, user: user._id };
        })

        await Book.insertMany(sampleBooks);

        console.log('Data imported.');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Book.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log('Data destroyed.');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}