const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  location: { type: String, required: true }, // ✅ plain string
  work_hours: { type: String },
  qr_code_url: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("QRRestaurant", RestaurantSchema);
