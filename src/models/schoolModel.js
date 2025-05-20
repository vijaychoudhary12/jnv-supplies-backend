const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    // Add other fields relevant to a school (e.g., address, contact info)
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('School', schoolSchema);