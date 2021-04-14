import express from 'express';
import { login, register, getUserDetails } from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/:id', getUserDetails);

export default router;