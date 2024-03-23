import fs from "fs/promises";
import path from "path";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as userServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import gravatar from "gravatar";
import Jimp from "jimp";

const avatarPath = path.resolve("public", "avatars");

const { SECRET_KEY } = process.env;

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const avatar = gravatar.url(email, { s: "200", r: "pg", d: "404" });
  const newUser = await userServices.signUp({ ...req.body, avatarURL: avatar });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
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
  res.status(204).send();
};

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;
  const user = await userServices.updateUser({ _id: id }, { subscription });
  res.json({
    subscription,
  });
};

const updateAvatars = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const { _id } = req.user;
  const newPath = path.join(avatarPath, filename);

  const resizedAvatar = await Jimp.read(oldPath);
  await resizedAvatar.resize(250, 250).write(oldPath);

  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  await userServices.updateUser({ _id }, { avatarURL: avatar });
  res.json({
    avatarURL: avatar,
  });
};

export default {
  signUpUser: ctrlWrapper(signUpUser),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatars: ctrlWrapper(updateAvatars),
};
