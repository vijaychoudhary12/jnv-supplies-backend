const asyncHandler = require('express-async-handler');
const School = require('../models/schoolModel');

// @desc    Get all schools
// @route   GET /api/schools
// @access  Private
const getSchools = asyncHandler(async (req, res) => {
  const schools = await School.find({});
  res.status(200).json(schools);
});

// @desc    Get single school
// @route   GET /api/schools/:id
// @access  Private
const getSchoolById = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);
  if (school) {
    res.status(200).json(school);
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

// @desc    Create new school
// @route   POST /api/schools
// @access  Private/Admin
const createSchool = asyncHandler(async (req, res) => {
  const { name, state, district } = req.body;
  if (!name || !state || !district) {
    res.status(400);
    throw new Error('Please add all fields');
  }
  const school = await School.create({ name, state, district });
  res.status(201).json(school);
});

// @desc    Update school
// @route   PUT /api/schools/:id
// @access  Private/Admin
const updateSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);
  if (school) {
    school.name = req.body.name || school.name;
    school.state = req.body.state || school.state;
    school.district = req.body.district || school.district;
    const updatedSchool = await school.save();
    res.status(200).json(updatedSchool);
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

// @desc    Delete school
// @route   DELETE /api/schools/:id
// @access  Private/Admin
const deleteSchool = asyncHandler(async (req, res) => {
  const school = await School.findById(req.params.id);
  if (school) {
    await School.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'School removed' });
  } else {
    res.status(404);
    throw new Error('School not found');
  }
});

module.exports = {
  getSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
};