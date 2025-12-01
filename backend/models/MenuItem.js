const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "QRRestaurant", required: true }, // ✅ add this line
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: String },
  image_url: { type: String },
  availability: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", MenuItemSchema);
