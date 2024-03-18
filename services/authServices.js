import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export const findUser = (filter) => User.findOne(filter);

export const signUp = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
};

export const validatePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
