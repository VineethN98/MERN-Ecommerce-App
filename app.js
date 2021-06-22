// Imports
const express = require("express");

// Import Routes
const userRoutes = require("./routes/user");

// Import and connect mongodb
const { mongodb } = require("./db/conn");

// Allows to use env variables
require("dotenv").config();

// Initialize app and PORT
const app = express();
const PORT = process.env.PORT || 8000;

// Routes Middleware
app.use("/api", userRoutes);

// Start the app
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
