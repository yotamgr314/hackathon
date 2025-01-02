// backend/controllers/order.js
const Order = require("../models/order");
const Inventory = require("../models/inventory");

const ingredientRequirements = {
  olives: { flour: 0.5, cheese: 0.5, tomatoes: 0.2, olives: 0.3 },
  mushrooms: { flour: 0.5, cheese: 0.5, tomatoes: 0.2, mushrooms: 0.2 },
  pineapple: { flour: 0.5, cheese: 0.5, tomatoes: 0.2, pineapple: 0.1 },
};

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Check inventory
    for (const item of items) {
      const requirements = ingredientRequirements[item.pizzaType];
      for (const [ingredient, amount] of Object.entries(requirements)) {
        const inventoryItem = await Inventory.findOne({ ingredient });
        if (!inventoryItem || inventoryItem.quantity < amount * item.quantity) {
          return res
            .status(400)
            .json({
              message: `Not enough ${ingredient} for ${item.pizzaType}`,
            });
        }
      }
    }

    // Deduct inventory
    for (const item of items) {
      const requirements = ingredientRequirements[item.pizzaType];
      for (const [ingredient, amount] of Object.entries(requirements)) {
        const inventoryItem = await Inventory.findOne({ ingredient });
        inventoryItem.quantity -= amount * item.quantity;
        await inventoryItem.save();
      }
    }

    // Create order
    const totalPrice = items.reduce(
      (total, item) => total + calculatePrice(item),
      0
    );
    const order = new Order({ items, totalPrice });
    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const calculatePrice = (item) => {
  const prices = { olives: 10, mushrooms: 12, pineapple: 15 };
  return prices[item.pizzaType] * item.quantity;
};
