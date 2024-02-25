import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

const { listContacts, getContactById, addContact, editContact, removeContact } =
  contactsService;

export const getAllContacts = async (_, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) throw HttpError(404);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await editContact(id, req.body);
    console.log(result);
    if (!result) throw HttpError(404);
    if (Object.keys(req.body).length === 0)
      throw HttpError(400, "Body must have at least one field");
    res.json(result);
  } catch (error) {
    next(error);
  }
};
