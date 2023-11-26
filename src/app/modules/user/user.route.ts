import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/', UserControllers.getAllUserController);
router.post('/', UserControllers.createUserController);
router.get('/:userId', UserControllers.getUserByIdController);
router.post('/:userId', UserControllers.updateUserById);
router.delete('/:userId', UserControllers.getAllUserController);

export const UserRoutes = router;
