const express = require('express');
const { getDashboardMetrics, getRecentActivity } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All dashboard routes require authentication
router.get('/metrics', protect, getDashboardMetrics);
router.get('/recent-activity', protect, getRecentActivity);

module.exports = router;