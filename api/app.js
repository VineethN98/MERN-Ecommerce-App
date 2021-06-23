// Imports
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");

// Allows to use env variables
require("dotenv").config();

// Initialize app and PORT
const app = express();
const PORT = process.env.PORT || 8000;

// Import and connect mongodb
const { mongodb } = require("./db/conn");

// Import Routes
const userRoutes = require("./routes/user");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes Middleware
app.use("/api", userRoutes);

// Start the app
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
