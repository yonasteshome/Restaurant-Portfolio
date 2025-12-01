const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getRestaurantDetails,
  updateRestaurant
} = require("../controllers/restaurantController");

const { verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Admin creates a restaurant
router.post("/", verifyAdmin, createRestaurant);

// ✅ Admin views restaurant
router.get("/", verifyAdmin, getRestaurantDetails);

// ✅ Admin updates restaurant
router.put("/", verifyAdmin, updateRestaurant);

module.exports = router;
