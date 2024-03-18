import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as userServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const { SECRET_KEY } = process.env;

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const newUser = await userServices.signUp(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await userServices.validatePassword(
    password,
    user.password
  );
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await userServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await userServices.updateUser({ _id }, { token: "" });
  res.json({
    message: "signout success",
  });
};

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;
  const user = await userServices.updateUser({ _id: id }, { subscription });
  res.json({
    subscription,
  });
};

export default {
  signUpUser: ctrlWrapper(signUpUser),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
  updateSubscription: ctrlWrapper(updateSubscription),
};
