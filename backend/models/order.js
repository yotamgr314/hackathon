// backend/models/order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      pizzaType: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
