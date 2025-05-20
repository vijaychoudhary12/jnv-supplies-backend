const mongoose = require('mongoose');

const tenderSchema = mongoose.Schema(
  {
    tenderId: { // Unique identifier for the tender (e.g., from an external portal)
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date, // Use Date type for dates
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'submitted', 'awarded', 'closed', 'cancelled'],
      default: 'open',
    },
    // Add other fields like school (ref to School model), documents, etc.
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School', // Reference to the School model
      required: false, // Make true if every tender must be linked to a school
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tender', tenderSchema);