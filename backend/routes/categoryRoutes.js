// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategoriesWithItems,
  getPublicCategories,
  getPublicCategoriesWithItems
} = require("../controllers/categoryController");

// ADMIN ROUTES (token required)
router.post("/", verifyAdmin, createCategory);
router.get("/", verifyAdmin, getCategories);
router.get("/items", verifyAdmin, getCategoriesWithItems);
router.delete("/:id", verifyAdmin, deleteCategory);

// PUBLIC ROUTES (no token)
router.get("/public/:restaurantId", getPublicCategories);
router.get("/public/:restaurantId/items", getPublicCategoriesWithItems);

module.exports = router;
