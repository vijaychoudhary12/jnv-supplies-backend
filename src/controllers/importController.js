const asyncHandler = require('express-async-handler');
const { parseCsv } = require('../utils/csvUtils');
const School = require('../models/schoolModel');
const Contact = require('../models/contactModel');
const Product = require('../models/productModel');
const Vendor = require('../models/vendorModel');
const fs = require('fs'); // For deleting temporary files

// Helper to remove uploaded file
const removeFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting temporary file ${filePath}:`, err);
  });
};

// @desc    Import schools from CSV
// @route   POST /api/import/schools
// @access  Private/Admin
const importSchools = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  try {
    const records = await parseCsv(req.file.path);
    const schoolsToInsert = records.map(record => ({
      name: record.Name,
      state: record.State,
      district: record.District,
      // Map other CSV headers to your School model fields
    }));

    await School.insertMany(schoolsToInsert, { ordered: false });
    res.status(200).json({ message: `${records.length} schools imported successfully.` });
  } catch (error) {
    console.error('Error importing schools:', error);
    res.status(500);
    throw new Error('Error importing schools: ' + error.message);
  } finally {
    removeFile(req.file.path); // Clean up the uploaded file
  }
});

// @desc    Import contacts from CSV
// @route   POST /api/import/contacts
// @access  Private/Admin
const importContacts = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  try {
    const records = await parseCsv(req.file.path);
    const contactsToInsert = records.map(record => ({
      name: record.Name,
      email: record.Email,
      phone: record.Phone,
      role: record.Role || 'general', // Map other CSV headers
      // Add other fields as per your Contact model
    }));

    await Contact.insertMany(contactsToInsert, { ordered: false });
    res.status(200).json({ message: `${records.length} contacts imported successfully.` });
  } catch (error) {
    console.error('Error importing contacts:', error);
    res.status(500);
    throw new Error('Error importing contacts: ' + error.message);
  } finally {
    removeFile(req.file.path);
  }
});

// @desc    Import products from CSV
// @route   POST /api/import/products
// @access  Private/Admin
const importProducts = asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded');
    }

    try {
      const records = await parseCsv(req.file.path);
      const productsToInsert = records.map(record => ({
        name: record.Name,
        category: record.Category,
        price: parseFloat(record.Price), // Ensure price is a number
        description: record.Description,
        // Add other fields as per your Product model
      }));

      await Product.insertMany(productsToInsert, { ordered: false });
      res.status(200).json({ message: `${records.length} products imported successfully.` });
    } catch (error) {
      console.error('Error importing products:', error);
      res.status(500);
      throw new Error('Error importing products: ' + error.message);
    } finally {
      removeFile(req.file.path);
    }
});

// @desc    Import vendors from CSV
// @route   POST /api/import/vendors
// @access  Private/Admin
const importVendors = asyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded');
    }

    try {
      const records = await parseCsv(req.file.path);
      const vendorsToInsert = records.map(record => ({
        name: record.Name,
        contactPerson: record.ContactPerson,
        email: record.Email,
        phone: record.Phone,
        address: record.Address,
        // Add other fields as per your Vendor model
      }));

      await Vendor.insertMany(vendorsToInsert, { ordered: false });
      res.status(200).json({ message: `${records.length} vendors imported successfully.` });
    } catch (error) {
      console.error('Error importing vendors:', error);
      res.status(500);
      throw new Error('Error importing vendors: ' + error.message);
    } finally {
      removeFile(req.file.path);
    }
});


module.exports = {
  importSchools,
  importContacts,
  importProducts,
  importVendors,
};