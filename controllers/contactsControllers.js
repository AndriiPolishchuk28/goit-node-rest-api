import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contact.js";

const getAllContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  console.log(result);
  if (!result) throw HttpError(404);
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw HttpError(404);
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "Body must have at least one field");
  res.json(result);
};

const updateFavourite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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
