import express from 'express';
import { getUser,createUser } from '../controllers/userController.js';

const router = express.Router();

//GET API to fetch all users
router.get('/users', getUser);

//POST API to create a new user
router.post('/users', createUser);

export default router;