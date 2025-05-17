import { Contact } from '../models/contactModel.js';
import { getAllContactsService } from '../services/contacts.js';

// GET all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContactsService();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

// GET one contact
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch contact',
      error: error.message,
    });
  }
};

// POST create new contact
export const createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Contact created successfully',
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to create contact',
      error: error.message,
    });
  }
};

// PUT update contact
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Contact updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to update contact',
      error: error.message,
    });
  }
};

// DELETE contact
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.contactId);
    if (!deleted) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to delete contact',
      error: error.message,
    });
  }
};