// backend/models/inventory.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  ingredient: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Inventory", inventorySchema);
