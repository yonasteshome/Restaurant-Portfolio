const mongoose = require("mongoose");

const MenuCategorySchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "QRRestaurant", required: true },
  category_name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("MenuCategory", MenuCategorySchema);
