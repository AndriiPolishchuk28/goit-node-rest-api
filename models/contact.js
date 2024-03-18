import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", setUpdateSettings);
contactSchema.post("findOneAndUpdate", handleSaveError);

export const Contact = model("contacts", contactSchema);
