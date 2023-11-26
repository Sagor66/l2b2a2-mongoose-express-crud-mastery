import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { UserServices } from './user.service';

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

const updateUserById = async (req: Request, res: Response) => {
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserService(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
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

export const UserControllers = {
  createUserController,
  getAllUserController,
  getUserByIdController,
  updateUserById,
  deleteUser,
};
