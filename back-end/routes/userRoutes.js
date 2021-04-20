import express from 'express';
import { login, register, getUserDetails, getUserProfile, updateProfile } from '../controllers/UserController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/profile', protectedRoute, getUserProfile);

router.put('/profile', protectedRoute, updateProfile);

router.get('/:id', getUserDetails);

export default router;