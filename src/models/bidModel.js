const mongoose = require('mongoose');

const bidSchema = mongoose.Schema(
  {
    tender: { // Reference to the tender this bid is for
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tender',
      required: true,
    },
    bidder: { // Could be a reference to a User or Vendor if you track who bid
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Or 'Vendor' if vendors are users in your system
      required: false, // For simplicity, keep it optional or change to required
    },
    amount: {
      type: Number,
      required: true,
    },
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'won', 'lost', 'withdrawn'],
      default: 'draft',
    },
    // Add fields like bid documents, notes, etc.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bid', bidSchema);