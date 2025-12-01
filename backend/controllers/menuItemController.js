const MenuItem = require("../models/MenuItem");

// ✅ Create Menu Item
exports.createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create({
      restaurant_id: req.restaurant_id,  // ✅ from verifyAdmin middleware
      category_id: req.body.category_id,
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients,
      image_url: req.body.image_url,
      availability: req.body.availability ?? true
    });

    res.status(201).json({
      message: "Menu item created successfully",
      item
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get items by category (public)
exports.getItemsByCategory = async (req, res) => {
  try {
    const items = await MenuItem.find({
      category_id: req.query.category_id
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all items for restaurant (admin only)
exports.getItemsByRestaurant = async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurant_id: req.restaurant_id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update full item details (name, price, etc.)
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, price, ingredients, image_url, availability, category_id } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, price, ingredients, image_url, availability, category_id },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json({
      message: "Menu item updated successfully",
      updatedItem
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update item availability (admin only)
exports.updateAvailability = async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { availability: req.body.availability },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete menu item (admin only)
exports.deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
