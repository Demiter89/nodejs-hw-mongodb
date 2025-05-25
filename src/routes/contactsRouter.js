import express from 'express';
import {
  handleGetAllContacts,
  handleGetContactById,
  handleCreateContact,
  handleUpdateContactById, 
  handleDeleteContactById, 
} from '../controllers/contactsController.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(handleGetAllContacts));
router.get('/:contactId', ctrlWrapper(handleGetContactById));
router.post('/', ctrlWrapper(handleCreateContact));
router.patch('/:contactId', ctrlWrapper(handleUpdateContactById)); 
router.delete('/:contactId', ctrlWrapper(handleDeleteContactById)); 

export default router;