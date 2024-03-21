import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schema from "../schemas/contactsSchemas.js";

import ctrl from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

// upload.array('poster', 8)
// upload.fields([{name: 'poster', maxCount: 1}])

contactsRouter.post(
  "/",
  upload.single("poster"),
  // validateBody(schema.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schema.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favourite",
  isValidId,
  validateBody(schema.updateFavouriteSchema),
  ctrl.updateFavourite
);

export default contactsRouter;
