import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

export const test = () => {
  console.log("tetetete");
};

export default isValidId;
