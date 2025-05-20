const express = require('express');
const {
  getBids,
  getBidById,
  createBid,
  updateBid,
  deleteBid,
} = require('../controllers/bidController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getBids)
  .post(protect, authorize(['admin', 'team_member']), createBid); // Assuming team members submit bids

router.route('/:id')
  .get(protect, getBidById)
  .put(protect, authorize(['admin', 'team_member']), updateBid)
  .delete(protect, authorize(['admin']), deleteBid);

module.exports = router;