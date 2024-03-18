import { Contact } from "../models/contact.js";

export const getAll = (filter = {}, query = {}) =>
  Contact.find(filter, null, query);

export const getOneContact = (filter) => Contact.findOne(filter);

export const deleteContact = (id) => Contact.findByIdAndDelete(id);

export const createContact = (data) => Contact.create(data);

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);
