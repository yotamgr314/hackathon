// backend/routes/inventory.js
const express = require("express");
const {
  getInventory,
  updateInventory,
  addIngredient,
} = require("../controllers/inventory");

const router = express.Router();

router.get("/", getInventory);
router.put("/", updateInventory);
router.post("/add", addIngredient);

module.exports = router;
