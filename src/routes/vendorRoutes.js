const express = require('express');
const {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendorController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getVendors)
  .post(protect, authorize(['admin', 'team_member']), createVendor);

router.route('/:id')
  .get(protect, getVendorById)
  .put(protect, authorize(['admin', 'team_member']), updateVendor)
  .delete(protect, authorize(['admin']), deleteVendor);

module.exports = router;