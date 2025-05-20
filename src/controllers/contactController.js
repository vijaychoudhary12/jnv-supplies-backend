const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
});

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

// @desc    Create new contact
// @route   POST /api/contacts
// @access  Private/Admin/Team Member
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, role, organization } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('Please add all required contact fields');
  }
  const contact = await Contact.create({ name, email, phone, role, organization });
  res.status(201).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private/Admin/Team Member
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    contact.name = req.body.name || contact.name;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;
    contact.role = req.body.role || contact.role;
    contact.organization = req.body.organization || contact.organization;
    const updatedContact = await contact.save();
    res.status(200).json(updatedContact);
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Contact removed' });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};