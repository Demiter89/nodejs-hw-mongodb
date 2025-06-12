import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  page = Number(page);
  perPage = Number(perPage);

  const skip = (page - 1) * perPage;
  const finalFilter = { ...filter, userId };

  const totalItems = await Contact.countDocuments(finalFilter);

  const contacts = await Contact.find(finalFilter)
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
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
  return await Contact.findOneAndUpdate({ _id: contactId, userId });
};

export const createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);
  return newContact;
};
export const patchContact = async (contactId, updateData, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
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
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
