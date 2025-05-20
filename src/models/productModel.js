const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures product names are unique
    },
    category: {
      type: String,
      required: true,
    },
    price: { // Base price or average price
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false, // Optional field
    },
    // You can add more fields here if needed, e.g.:
    // unit: { type: String, enum: ['kg', 'pcs', 'liters', 'sets'], required: true },
    // sku: { type: String, unique: true },
    // imageUrl: { type: String },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model('Product', productSchema);