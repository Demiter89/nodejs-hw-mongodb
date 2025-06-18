import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { getPhotoUrl } from '../utils/getPhotoUrl.js';
export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const data = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const handleGetContactById = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found!');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photoUrl = await getPhotoUrl(req.file);

  const newContact = {
    userId: req.user._id,
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };
  const result = await createContact(newContact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};
export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    console.log('patchContactController:', {
      contactId,
      userId,
      body: req.body,
    });

    const photo = req.file;
    let photoUrl;
    if (photo) {
      photoUrl = await getPhotoUrl(photo);
    }

    const payload = {
      ...req.body,
      ...(photoUrl && { photo: photoUrl }),
    };
    const result = await patchContact(contactId, userId, payload);

    if (!result) {
      return next(createHttpError(404, 'Contact not found!'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};