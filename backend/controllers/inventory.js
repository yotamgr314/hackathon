// backend/controllers/inventory.js
const Inventory = require("../models/inventory");

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { ingredient, quantity } = req.body;
    const inventoryItem = await Inventory.findOne({ ingredient });
    if (!inventoryItem) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    inventoryItem.quantity = quantity;
    await inventoryItem.save();
    res.json(inventoryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addIngredient = async (req, res) => {
  try {
    const { ingredient, quantity } = req.body;
    let inventoryItem = await Inventory.findOne({ ingredient });
    if (inventoryItem) {
      inventoryItem.quantity += quantity;
    } else {
      inventoryItem = new Inventory({ ingredient, quantity });
    }
    await inventoryItem.save();
    res.json(inventoryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
