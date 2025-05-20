const asyncHandler = require('express-async-handler');
const Tender = require('../models/tenderModel');

// @desc    Get all tenders
// @route   GET /api/tenders
// @access  Private
const getTenders = asyncHandler(async (req, res) => {
  const tenders = await Tender.find({});
  res.status(200).json(tenders);
});

// @desc    Get single tender
// @route   GET /api/tenders/:id
// @access  Private
const getTenderById = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (tender) {
    res.status(200).json(tender);
  } else {
    res.status(404);
    throw new Error('Tender not found');
  }
});

// @desc    Create new tender
// @route   POST /api/tenders
// @access  Private/Admin/Team Member
const createTender = asyncHandler(async (req, res) => {
  const { tenderId, description, deadline, status } = req.body;
  if (!tenderId || !description || !deadline) {
    res.status(400);
    throw new Error('Please add all required tender fields');
  }
  const tender = await Tender.create({ tenderId, description, deadline, status });
  res.status(201).json(tender);
});

// @desc    Update tender
// @route   PUT /api/tenders/:id
// @access  Private/Admin/Team Member
const updateTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (tender) {
    tender.tenderId = req.body.tenderId || tender.tenderId;
    tender.description = req.body.description || tender.description;
    tender.deadline = req.body.deadline || tender.deadline;
    tender.status = req.body.status || tender.status;
    const updatedTender = await tender.save();
    res.status(200).json(updatedTender);
  } else {
    res.status(404);
    throw new Error('Tender not found');
  }
});

// @desc    Delete tender
// @route   DELETE /api/tenders/:id
// @access  Private/Admin
const deleteTender = asyncHandler(async (req, res) => {
  const tender = await Tender.findById(req.params.id);
  if (tender) {
    await Tender.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Tender removed' });
  } else {
    res.status(404);
    throw new Error('Tender not found');
  }
});

module.exports = {
  getTenders,
  getTenderById,
  createTender,
  updateTender,
  deleteTender,
};