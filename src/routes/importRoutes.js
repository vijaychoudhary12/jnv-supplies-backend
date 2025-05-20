const express = require('express');
const multer = require('multer'); // For handling file uploads
const { importSchools, importContacts, importProducts, importVendors } = require('../controllers/importController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Protect and authorize access

const router = express.Router();

// Configure Multer for file storage
// For simplicity, store files in a 'uploads' directory in the backend root
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Make sure this 'uploads' directory exists in your backend root (jnv-supplies-backend/)
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Append timestamp to avoid file name collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Routes for importing data via CSV
// Only 'admin' role can import data
router.post('/schools', protect, authorize(['admin']), upload.single('file'), importSchools);
router.post('/contacts', protect, authorize(['admin']), upload.single('file'), importContacts);
router.post('/products', protect, authorize(['admin']), upload.single('file'), importProducts);
router.post('/vendors', protect, authorize(['admin']), upload.single('file'), importVendors);
// Add more import routes for other modules as needed

module.exports = router;