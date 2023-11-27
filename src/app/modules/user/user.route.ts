import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// User Routes
router.get('/', UserControllers.getAllUserController);
router.post('/', UserControllers.createUserController);
router.get('/:userId', UserControllers.getUserByIdController);
router.post('/:userId', UserControllers.updateUserById);
router.delete('/:userId', UserControllers.deleteUser);

// Order Routes
router.put('/:userId', UserControllers.updateOrder);

export const UserRoutes = router;
