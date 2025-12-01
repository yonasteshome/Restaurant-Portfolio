const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QRRestaurant",
    default: null, // ✅ restaurant will be linked later
  },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
