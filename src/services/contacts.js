import Contact from '../models/contactModel.js';


export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};
export const updateContactById = async (contactId, data) => {
  return await Contact.findByIdAndUpdate(contactId, data, { new: true });
};


export const deleteContactById = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact; // якщо не знайдено — буде null
};
