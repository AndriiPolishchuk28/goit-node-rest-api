import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schema from "../schemas/contactsSchemas.js";

import ctrl from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.post(
  "/",
  validateBody(schema.createContactSchema),
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
