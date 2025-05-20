const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
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
    role: { // e.g., 'Principal', 'Alumni', 'Supplier Contact', 'Team Member'
      type: String,
      required: false,
    },
    organization: { // e.g., which school they belong to, or vendor company
      type: String,
      required: false,
    },
    // Add other relevant fields like address, notes, etc.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);