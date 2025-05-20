const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactType: { type: String, required: true, enum: ['Principal', 'Alumni', 'Vendor', 'Logistics', 'Team Member', 'Storekeeper', 'NVS Official', 'Other'] }, // Categorize contacts
  email: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
  phone: { type: String, trim: true },
  associatedSchool: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }, // Link to School if applicable
  associatedVendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }, // Link to Vendor if applicable
  associatedLogistics: { type: mongoose.Schema.Types.ObjectId, ref: 'Logistics' }, // Link to Logistics if applicable
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);