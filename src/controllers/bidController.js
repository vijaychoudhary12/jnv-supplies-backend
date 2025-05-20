const asyncHandler = require('express-async-handler');
const Bid = require('../models/bidModel');

// @desc    Get all bids
// @route   GET /api/bids
// @access  Private
const getBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({});
  res.status(200).json(bids);
});

// @desc    Get single bid
// @route   GET /api/bids/:id
// @access  Private
const getBidById = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  if (bid) {
    res.status(200).json(bid);
  } else {
    res.status(404);
    throw new Error('Bid not found');
  }
});

// @desc    Create new bid
// @route   POST /api/bids
// @access  Private/Admin/Team Member
const createBid = asyncHandler(async (req, res) => {
  const { tenderId, amount, date, status, bidder } = req.body;
  if (!tenderId || !amount || !date || !bidder) {
    res.status(400);
    throw new Error('Please add all required bid fields');
  }
  const bid = await Bid.create({ tenderId, amount, date, status, bidder });
  res.status(201).json(bid);
});

// @desc    Update bid
// @route   PUT /api/bids/:id
// @access  Private/Admin/Team Member
const updateBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  if (bid) {
    bid.tenderId = req.body.tenderId || bid.tenderId;
    bid.amount = req.body.amount || bid.amount;
    bid.date = req.body.date || bid.date;
    bid.status = req.body.status || bid.status;
    bid.bidder = req.body.bidder || bid.bidder;
    const updatedBid = await bid.save();
    res.status(200).json(updatedBid);
  } else {
    res.status(404);
    throw new Error('Bid not found');
  }
});

// @desc    Delete bid
// @route   DELETE /api/bids/:id
// @access  Private/Admin
const deleteBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  if (bid) {
    await Bid.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Bid removed' });
  } else {
    res.status(404);
    throw new Error('Bid not found');
  }
});

module.exports = {
  getBids,
  getBidById,
  createBid,
  updateBid,
  deleteBid,
};