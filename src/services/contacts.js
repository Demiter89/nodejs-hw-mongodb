import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';


export const getAllContacts = async ({
  page,
  perPage,
  sortBy = 'name',
  sortOrder,
  filter = {},
  userId,
}) => {
  page = Number(page);
  perPage = Number(perPage);

  const skip = (page - 1) * perPage;
  const finalFilter = { ...filter, userId };

  const totalItems = await ContactsCollection.countDocuments(finalFilter);

  const contacts = await ContactsCollection.find(finalFilter)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData({
    perPage,
    page,
    totalItems,
  });
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};
export const patchContact = async (contactId, userId, updateData) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedContact;
};
export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};