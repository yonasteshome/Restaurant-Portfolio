const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "QRRestaurant", required: true },
  comment: { type: String, required: true },
  customer_name: { type: String },
  is_reviewed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);
