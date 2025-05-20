const asyncHandler = require('express-async-handler');
const School = require('../models/schoolModel');
const Tender = require('../models/tenderModel');
const Product = require('../models/productModel');
const Bid = require('../models/bidModel');
const Vendor = require('../models/vendorModel');
const Contact = require('../models/contactModel');

// @desc    Get dashboard summary metrics
// @route   GET /api/dashboard/metrics
// @access  Private
const getDashboardMetrics = asyncHandler(async (req, res) => {
  // You can add more complex queries and aggregations here later
  const totalSchools = await School.countDocuments({});
  const totalTenders = await Tender.countDocuments({});
  const openTenders = await Tender.countDocuments({ status: 'open' });
  const totalProducts = await Product.countDocuments({});
  const totalBids = await Bid.countDocuments({});
  const totalVendors = await Vendor.countDocuments({});
  const totalContacts = await Contact.countDocuments({});

  // Example: Count bids won/lost (you'll need to update your Bid model if status doesn't include these)
  // const bidsWon = await Bid.countDocuments({ status: 'won' });
  // const bidsLost = await Bid.countDocuments({ status: 'lost' });


  res.status(200).json({
    totalSchools,
    totalTenders,
    openTenders,
    totalProducts,
    totalBids,
    totalVendors,
    totalContacts,
    // bidsWon, // Include if you have these statuses in your Bid model
    // bidsLost,
  });
});

// @desc    Get recent activities (e.g., latest tenders, bids)
// @route   GET /api/dashboard/recent-activity
// @access  Private
const getRecentActivity = asyncHandler(async (req, res) => {
    const recentTenders = await Tender.find({})
        .sort({ createdAt: -1 }) // Sort by latest creation date
        .limit(5); // Get the 5 most recent

    const recentBids = await Bid.find({})
        .sort({ dateSubmitted: -1 }) // Assuming dateSubmitted for bids
        .limit(5);

    res.status(200).json({
        recentTenders,
        recentBids
    });
});


module.exports = {
  getDashboardMetrics,
  getRecentActivity,
};