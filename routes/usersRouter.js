import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schemas from "../models/user.js";
import ctrl from "../controllers/users.Controllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.signUpUser
);

usersRouter.post("/login", validateBody(schemas.signInSchema), ctrl.login);
usersRouter.get("/current", authenticate, ctrl.getCurrent);
usersRouter.post("/logout", authenticate, ctrl.signOut);
usersRouter.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscription),
  ctrl.updateSubscription
);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  ctrl.updateAvatars
);

export default usersRouter;
