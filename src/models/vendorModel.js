const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    contactPerson: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    // Add fields for vendor rating, products supplied, etc.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vendor', vendorSchema);