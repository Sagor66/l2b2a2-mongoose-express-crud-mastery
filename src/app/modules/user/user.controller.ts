import { Request, Response } from 'express';
import { UserServices } from './user.service';
import {
  userOrderValidationSchema,
  userValidationSchema,
} from './user.validation';

const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserService(zodParsedData);

    let modifiedData;

    if (result) {
      modifiedData = {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
      };
    }

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: modifiedData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllUserController = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserService();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByIdService(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: '404',
        description: error.message,
      },
    });
  }
};

const updateUserByIdController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;

    const zodParsedData = userValidationSchema.parse(userData);

    const result = await UserServices.updateUserByIdService(
      parseInt(userId),
      zodParsedData
    );

    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: '404',
        description: error.message,
      },
    });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserService(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result && null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const updateOrderController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    const zodParsedData = userOrderValidationSchema.parse(orderData);

    const result = await UserServices.updateOrderService(
      parseInt(userId),
      zodParsedData
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result && null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getOrdersController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getOrdersService(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getTotalPriceController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await UserServices.getOrdersService(parseInt(userId));
    let totalPrice;

    if (orders) {
      totalPrice = orders?.orders?.reduce(
        (prev: number, order: any) => prev + order.price,
        0
      );
    }

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully',
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserControllers = {
  createUserController,
  getAllUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserController,
  updateOrderController,
  getOrdersController,
  getTotalPriceController,
};
