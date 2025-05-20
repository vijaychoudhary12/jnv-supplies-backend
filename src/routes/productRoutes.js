const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController'); // Ensure this path is correct
const { protect, authorize } = require('../middleware/authMiddleware'); // Ensure this path is correct

const router = express.Router();

router.route('/')
  .get(protect, getProducts) // Anyone authenticated can view products
  .post(protect, authorize(['admin', 'team_member']), createProduct); // Admin or Team Member can create products

router.route('/:id')
  .get(protect, getProductById) // Anyone authenticated can view a single product
  .put(protect, authorize(['admin', 'team_member']), updateProduct) // Admin or Team Member can update products
  .delete(protect, authorize(['admin']), deleteProduct); // Only Admin can delete products

module.exports = router;