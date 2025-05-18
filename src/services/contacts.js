// src/services/contacts.js
import { Contact } from '../models/contactModel.js';

export const getAllContactsService = async () => {
  return await Contact.find();
};
