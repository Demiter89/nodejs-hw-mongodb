import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById, 
} from '../services/contacts.js';

export const handleGetAllContacts = async (req, res, next) => {
  try {
    const { page, perPage, sortBy, sortOrder } = req.query;

    const contactsData = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contactsData,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const handleCreateContact = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Contact successfully created!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContactById(contactId, req.body);

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }


    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
export const handleDeleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContactById(contactId);

    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send(); // статус 204, без тіла відповіді
  } catch (error) {
    next(error);
  }
};

