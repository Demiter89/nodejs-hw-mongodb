import express from 'express';
import {
  handleGetAllContacts,
  handleGetContactById,
  handleCreateContact, // 
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', handleGetAllContacts);
router.get('/:contactId', handleGetContactById);
router.post('/', handleCreateContact); 

export default router;