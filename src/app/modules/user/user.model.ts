import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserName } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const userAddressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const userOrderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
  },
});

const userSchema = new Schema<TUser>(
  {
    userId: { type: Number, required: true, unique: true },
    username: {
      type: String,
      required: [true, 'Unique user name is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    fullName: {
      type: userNameSchema,
      required: [true, 'User name is required'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String }],
    address: { type: userAddressSchema },
    orders: [{ type: userOrderSchema, required: [true, 'Order is required'] }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
