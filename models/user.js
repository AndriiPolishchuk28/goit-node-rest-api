import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    avatarURL: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

export const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailPattern),
  password: Joi.string().min(6).required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().required().pattern(emailPattern),
  password: Joi.string().min(6).required(),
});

export const updateSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().required().pattern(emailPattern),
});

export const User = model("user", userSchema);
