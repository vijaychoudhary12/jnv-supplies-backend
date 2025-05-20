const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getContacts)
  .post(protect, authorize(['admin', 'team_member']), createContact);

router.route('/:id')
  .get(protect, getContactById)
  .put(protect, authorize(['admin', 'team_member']), updateContact)
  .delete(protect, authorize(['admin']), deleteContact);

module.exports = router;