import express from 'express';
import {
  getContactsController,
  handleGetContactById,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contactsValidation.js';
import { isValidId } from '../middlewares/isValidId.js';
import { updateContactSchema } from '../validation/contactsValidation.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();
const jsonParser = express.json();

router.get('/', authenticate, ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(handleGetContactById),
);
router.post(
  '/',
  jsonParser,
  upload.single('photo'),
  jsonParser,
  authenticate,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  upload.single('photo'),
  authenticate,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;