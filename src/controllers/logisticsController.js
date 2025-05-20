const asyncHandler = require('express-async-handler');
const Logistics = require('../models/logisticsModel');

// @desc    Get all logistics providers
// @route   GET /api/logistics
// @access  Private
const getLogistics = asyncHandler(async (req, res) => {
  const logistics = await Logistics.find({});
  res.status(200).json(logistics);
});

// @desc    Get single logistics provider
// @route   GET /api/logistics/:id
// @access  Private
const getLogisticsById = asyncHandler(async (req, res) => {
  const logistics = await Logistics.findById(req.params.id);
  if (logistics) {
    res.status(200).json(logistics);
  } else {
    res.status(404);
    throw new Error('Logistics provider not found');
  }
});

// @desc    Create new logistics provider
// @route   POST /api/logistics
// @access  Private/Admin/Team Member
const createLogistics = asyncHandler(async (req, res) => {
  const { name, contactPerson, email, phone, serviceAreas } = req.body;
  if (!name || !contactPerson || !email || !phone || !serviceAreas) {
    res.status(400);
    throw new Error('Please add all required logistics fields');
  }
  const logistics = await Logistics.create({ name, contactPerson, email, phone, serviceAreas });
  res.status(201).json(logistics);
});

// @desc    Update logistics provider
// @route   PUT /api/logistics/:id
// @access  Private/Admin/Team Member
const updateLogistics = asyncHandler(async (req, res) => {
  const logistics = await Logistics.findById(req.params.id);
  if (logistics) {
    logistics.name = req.body.name || logistics.name;
    logistics.contactPerson = req.body.contactPerson || logistics.contactPerson;
    logistics.email = req.body.email || logistics.email;
    logistics.phone = req.body.phone || logistics.phone;
    logistics.serviceAreas = req.body.serviceAreas || logistics.serviceAreas;
    const updatedLogistics = await logistics.save();
    res.status(200).json(updatedLogistics);
  } else {
    res.status(404);
    throw new Error('Logistics provider not found');
  }
});

// @desc    Delete logistics provider
// @route   DELETE /api/logistics/:id
// @access  Private/Admin
const deleteLogistics = asyncHandler(async (req, res) => {
  const logistics = await Logistics.findById(req.params.id);
  if (logistics) {
    await Logistics.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Logistics provider removed' });
  } else {
    res.status(404);
    throw new Error('Logistics provider not found');
  }
});

module.exports = {
  getLogistics,
  getLogisticsById,
  createLogistics,
  updateLogistics,
  deleteLogistics,
};