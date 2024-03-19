import { Contact } from "../models/contact.js";

export const getAll = (filter = {}, query = {}) =>
  Contact.find(filter, null, query);

export const getOneContact = (filter) => Contact.findOne(filter);

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);

export const createContact = (data) => Contact.create(data);

export const updateContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
