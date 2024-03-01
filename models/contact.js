import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";

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
  },
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleMongooseError);

export const Contact = model("contacts", contactSchema);
