import { TUser } from './user.interface';
import { User } from './user.model';

const createUserService = async (userData: TUser) => {
  return await User.create(userData);
};

const getUserService = async () => {
  return await User.find();
};

const getUserByIdService = async (userId: number) => {
  return await User.findOne({ userId });
};

const updateUserByIdService = async (id: number, updateData: any) => {
  return await User.updateOne({ id }, updateData);
};

const deleteUserService = async (id: number) => {
  return await User.updateOne({ id }, { isDeleted: true });
};

export const UserServices = {
  createUserService,
  getUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserService,
};
