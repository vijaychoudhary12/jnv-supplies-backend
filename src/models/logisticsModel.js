const mongoose = require('mongoose');

const logisticsSchema = mongoose.Schema(
  {
    name: { // Name of the logistics provider (e.g., "Delhivery", "Blue Dart")
      type: String,
      required: true,
      unique: true,
    },
    contactPerson: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    serviceAreas: [ // Array of states or districts they serve
      {
        type: String,
        required: false,
      }
    ],
    // Add fields for pricing models, type of service, etc.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Logistics', logisticsSchema);