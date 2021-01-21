import express from 'express';
const router = express.Router();

import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUsers,
	getUserById,
	updateUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleWares/authMiddleWare.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/register').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
	.route('/:id')
	.delete(protect, admin, deleteUsers)
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser);

export default router;
