import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// User Routes
router.get('/', UserControllers.getAllUserController);
router.post('/', UserControllers.createUserController);
router.get('/:userId', UserControllers.getUserByIdController);
router.put('/:userId', UserControllers.updateUserByIdController);
router.delete('/:userId', UserControllers.deleteUserController);

// Order Routes
router.put('/:userId/orders', UserControllers.updateOrderController);
router.get('/:userId/orders', UserControllers.getOrdersController);
router.get(
  '/:userId/orders/total-price',
  UserControllers.getTotalPriceController
);

export const UserRoutes = router;
