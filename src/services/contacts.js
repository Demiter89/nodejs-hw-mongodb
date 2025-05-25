import Contact from '../models/contactModel.js';

export const getAllContacts = async (query) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = query;

  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  // Створюємо динамічний фільтр
  const filter = {};

  if (type) {
    filter.contactType = type;
  }

  if (isFavourite !== undefined) {
    // Перетворюємо string у boolean
    filter.isFavourite = isFavourite === 'true';
  }

  const [data, totalItems] = await Promise.all([
    Contact.find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(Number(perPage)),
    Contact.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
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
