import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

const createUserService = async (userData: TUser) => {
  return await User.create(userData);
};

const getUserService = async () => {
  return await User.find().select(
    'username fullName.firstName fullName.lastName age email address.street address.city address.country'
  );
};

const getUserByIdService = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    return await User.findOne({ userId }).select(
      'userId username fullName.firstName fullName.lastName age email isActive hobbies address.street address.city address.country'
    );
  } else {
    throw new Error('User not found');
  }
};

const updateUserByIdService = async (id: number, updateData: TUser) => {
  if (await User.isUserExists(id)) {
    return await User.findOneAndUpdate({ userId: id }, updateData, {
      new: true,
    }).select(
      'userId username fullName.firstName fullName.lastName age email isActive hobbies address.street address.city address.country'
    );
  } else {
    throw new Error('User not found');
  }
};

const deleteUserService = async (id: number) => {
  if (await User.isUserExists(id)) {
    return await User.findOneAndDelete({ userId: id });
  } else {
    throw new Error('User not found');
  }
};

const updateOrderService = async (id: number, orderData: TOrders) => {
  if (await User.isUserExists(id)) {
    return await User.findOneAndUpdate(
      { userId: id },
      { $push: { orders: orderData } },
      { upsert: true }
    );
  } else {
    throw new Error('User not found');
  }
};

const getOrdersService = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    return await User.findOne({ userId }).select('orders');
  } else {
    throw new Error('User not found');
  }
};

export const UserServices = {
  createUserService,
  getUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserService,
  updateOrderService,
  getOrdersService,
};
