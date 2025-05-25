import express from 'express';
import {
  handleGetAllContacts,
  handleGetContactById,
  handleCreateContact,
  handleUpdateContactById,
  handleDeleteContactById,
} from '../controllers/contactsController.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactSchemas.js';

const router = express.Router();

// GET /contacts
router.get('/', ctrlWrapper(handleGetAllContacts));

// GET /contacts/:contactId
router.get('/:contactId', isValidId, ctrlWrapper(handleGetContactById));

// POST /contacts
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(handleCreateContact)
);

// PATCH /contacts/:contactId
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(handleUpdateContactById)
);

// DELETE /contacts/:contactId
router.delete('/:contactId', isValidId, ctrlWrapper(handleDeleteContactById));

export default router;
