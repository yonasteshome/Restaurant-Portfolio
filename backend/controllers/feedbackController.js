const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      restaurant_id: req.restaurant_id
    });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markReviewed = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { is_reviewed: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
