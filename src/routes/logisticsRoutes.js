const express = require('express');
const {
  getLogistics,
  getLogisticsById,
  createLogistics,
  updateLogistics,
  deleteLogistics,
} = require('../controllers/logisticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getLogistics)
  .post(protect, authorize(['admin', 'team_member']), createLogistics);

router.route('/:id')
  .get(protect, getLogisticsById)
  .put(protect, authorize(['admin', 'team_member']), updateLogistics)
  .delete(protect, authorize(['admin']), deleteLogistics);

module.exports = router;