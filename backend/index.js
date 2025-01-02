// backend/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the CORS middleware
const dbConfig = require("./config/db");
const inventoryRoutes = require("./routes/inventory");
const orderRoutes = require("./routes/order");

const app = express();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Connect to the database
dbConfig();

// Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
