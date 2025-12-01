const MenuCategory = require("../models/MenuCategory");
const MenuItem = require("../models/MenuItem");

// ------------------ ADMIN CONTROLLERS ------------------

exports.createCategory = async (req, res) => {
  try {
    const category = await MenuCategory.create({
      restaurant_id: req.restaurant_id,
      category_name: req.body.category_name
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find({
      restaurant_id: req.restaurant_id
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await MenuCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: categories + items
exports.getCategoriesWithItems = async (req, res) => {
  try {
    const restaurantId = req.restaurant_id;

    const categories = await MenuCategory.find({ restaurant_id: restaurantId });
    const items = await MenuItem.find({ restaurant_id: restaurantId });

    const result = categories.map(category => ({
      _id: category._id,
      category_name: category.category_name,
      items: items.filter(
        item => item.category_id.toString() === category._id.toString()
      )
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------ PUBLIC CONTROLLERS ------------------

// Public: Get categories (restaurantId from URL)
exports.getPublicCategories = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const categories = await MenuCategory.find({
      restaurant_id: restaurantId
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Public: Get categories + items (restaurantId from URL)
exports.getPublicCategoriesWithItems = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const categories = await MenuCategory.find({ restaurant_id: restaurantId });
    const items = await MenuItem.find({ restaurant_id: restaurantId });

    const result = categories.map(category => ({
      _id: category._id,
      category_name: category.category_name,
      items: items.filter(
        item => item.category_id.toString() === category._id.toString()
      )
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
