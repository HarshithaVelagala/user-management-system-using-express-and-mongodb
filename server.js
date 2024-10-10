const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

// Load environment variables from config.env
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 3000;

// Log HTTP requests
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Parse incoming requests with built-in middleware
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static assets (CSS, images, JS)
app.use('/CSS', express.static(path.resolve(__dirname, 'assets/CSS')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// Load the router
app.use('/', require('./server/route/router'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ...`);
});