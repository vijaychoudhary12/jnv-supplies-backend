const asyncHandler = require('express-async-handler');
const Vendor = require('../models/vendorModel');

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Private
const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find({});
  res.status(200).json(vendors);
});

// @desc    Get single vendor
// @route   GET /api/vendors/:id
// @access  Private
const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (vendor) {
    res.status(200).json(vendor);
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

// @desc    Create new vendor
// @route   POST /api/vendors
// @access  Private/Admin/Team Member
const createVendor = asyncHandler(async (req, res) => {
  const { name, contactPerson, email, phone, address } = req.body;
  if (!name || !contactPerson || !email || !phone) {
    res.status(400);
    throw new Error('Please add all required vendor fields');
  }
  const vendor = await Vendor.create({ name, contactPerson, email, phone, address });
  res.status(201).json(vendor);
});

// @desc    Update vendor
// @route   PUT /api/vendors/:id
// @access  Private/Admin/Team Member
const updateVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (vendor) {
    vendor.name = req.body.name || vendor.name;
    vendor.contactPerson = req.body.contactPerson || vendor.contactPerson;
    vendor.email = req.body.email || vendor.email;
    vendor.phone = req.body.phone || vendor.phone;
    vendor.address = req.body.address || vendor.address;
    const updatedVendor = await vendor.save();
    res.status(200).json(updatedVendor);
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

// @desc    Delete vendor
// @route   DELETE /api/vendors/:id
// @access  Private/Admin
const deleteVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (vendor) {
    await Vendor.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Vendor removed' });
  } else {
    res.status(404);
    throw new Error('Vendor not found');
  }
});

module.exports = {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};