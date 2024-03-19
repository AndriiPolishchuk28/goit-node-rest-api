import * as contacts from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contact.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favourite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  if (favourite) {
    query.favourite = favourite;
  }

  const result = await contacts.getAll(query, { skip, limit, favourite });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await contacts.getOneContact({ _id: id, owner });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await contacts.deleteContact({ _id: id, owner });
  if (!result) throw HttpError(404);
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contacts.createContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await contacts.updateContact({ _id: id, owner }, req.body);
  if (!result) throw HttpError(404);
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "Body must have at least one field");
  res.json(result);
};

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await contacts.updateContact({ _id: id, owner }, req.body);
  if (!result) throw HttpError(404);
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "Body must have at least one field");
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavourite: ctrlWrapper(updateFavourite),
};
