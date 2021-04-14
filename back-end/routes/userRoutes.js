import express from 'express';
import { login, register, getUserDetails, getUserProfile, updateProfile } from '../controllers/UserController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/profile', protectRoute, getUserProfile);

router.put('/profile', protectRoute, updateProfile);

router.get('/:id', getUserDetails);

export default router;