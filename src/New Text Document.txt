const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Needed for temporary file management with Multer (though not directly used here, good practice)

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true, // Deprecated in Mongoose 6.0+
  // useUnifiedTopology: true, // Deprecated in Mongoose 6.0+
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// --- Middleware ---

// Enable CORS for all origins (or specify your frontend origin like 'http://localhost:3000')
// For development, '*' is fine. For production, specify your frontend URL.
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from your frontend
}));

// Body parser middleware to handle JSON requests
// This is crucial for parsing the JSON body sent from Postman or your frontend
app.use(express.json());

// If you handle URL-encoded data (e.g., from HTML forms), add this as well:
app.use(express.urlencoded({ extended: true }));


// --- Import Routes ---
// Ensure these route files exist in your src/routes directory
const authRoutes = require('./routes/authRoutes');
const importRoutes = require('./routes/importRoutes');
// Add other routes as you create them (e.g., for schools, tenders, products)
const schoolRoutes = require('./routes/schoolRoutes');
const tenderRoutes = require('./routes/tenderRoutes');
const productRoutes = require('./routes/productRoutes');
const bidRoutes = require('./routes/bidRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const logisticsRoutes = require('./routes/logisticsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // NEW IMPORT


// --- Define API Routes ---

// Authentication routes
app.use('/api/auth', authRoutes);

// Import routes
app.use('/api/import', importRoutes);

// Add other module-specific routes
app.use('/api/schools', schoolRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/dashboard', dashboardRoutes); // NEW ROUTE DEFINITION


// --- Basic Error Handling Middleware ---
// This is a generic error handler that catches errors from async operations.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  // If the error is a SyntaxError due to bad JSON, handle it specifically
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: 'Bad JSON format in request body.' });
  }
  // Generic error response for other errors
  res.status(err.status || 500).send(err.message || 'Something broke!');
});


// --- Server Listener ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});