const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const {
  createMenuItem,
  getItemsByCategory,
  getItemsByRestaurant,
  updateMenuItem,
  updateAvailability,
  deleteMenuItem
} = require("../controllers/menuItemController");

// ✅ Create new menu item
router.post("/", verifyAdmin, createMenuItem);

// ✅ Get items by category (public)
router.get("/", getItemsByCategory);

// ✅ Get all items for this restaurant (admin)
router.get("/restaurant", verifyAdmin, getItemsByRestaurant);

// ✅ Update full menu item (admin)
router.put("/:id", verifyAdmin, updateMenuItem);

// ✅ Update availability only (admin)
router.patch("/:id/availability", verifyAdmin, updateAvailability);

// ✅ Delete item (admin)
router.delete("/:id", verifyAdmin, deleteMenuItem);

module.exports = router;
