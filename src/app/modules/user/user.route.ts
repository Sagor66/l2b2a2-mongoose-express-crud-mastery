import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// User Routes
router.get('/', UserControllers.getAllUserController);
router.post('/', UserControllers.createUserController);
router.get('/:userId', UserControllers.getUserByIdController);
router.put('/:userId', UserControllers.updateUserById);
router.delete('/:userId', UserControllers.deleteUser);

// Order Routes
router.put('/:userId/orders', UserControllers.updateOrder);
router.get('/:userId/orders', UserControllers.getOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;
