import { TUser } from './user.interface';
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
    throw new Error("User doesn't exists");
  }
};

const updateUserByIdService = async (id: number, updateData: TUser) => {
  return await User.findOneAndUpdate({ userId: id }, updateData, {
    new: true,
  }).select(
    'userId username fullName.firstName fullName.lastName age email isActive hobbies address.street address.city address.country'
  );
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
