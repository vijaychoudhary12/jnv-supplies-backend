const express = require('express');
const {
  getSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
} = require('../controllers/schoolController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getSchools) // Anyone authenticated can view schools
  .post(protect, authorize(['admin']), createSchool); // Only admin can create schools

router.route('/:id')
  .get(protect, getSchoolById) // Anyone authenticated can view a single school
  .put(protect, authorize(['admin']), updateSchool) // Only admin can update schools
  .delete(protect, authorize(['admin']), deleteSchool); // Only admin can delete schools

module.exports = router;