import express from 'express';
import { getUser,createUser,updateUserPut,updateUserPatch } from '../controllers/userController.js';

const router = express.Router();

//GET API to fetch all users
router.get('/users', getUser);

//POST API to create a new user
router.post('/users', createUser);

//PUT API to update an existing user
router.put('/users/:id', updateUserPut);

//PATCH API to partially update an existing user
router.patch('/users/:id', updateUserPatch);

export default router;