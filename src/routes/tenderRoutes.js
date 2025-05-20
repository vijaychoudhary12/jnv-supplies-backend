const express = require('express');
const {
  getTenders,
  getTenderById,
  createTender,
  updateTender,
  deleteTender,
} = require('../controllers/tenderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTenders)
  .post(protect, authorize(['admin', 'team_member']), createTender); // Admin/Team Member can create

router.route('/:id')
  .get(protect, getTenderById)
  .put(protect, authorize(['admin', 'team_member']), updateTender)
  .delete(protect, authorize(['admin']), deleteTender); // Only admin can delete

module.exports = router;