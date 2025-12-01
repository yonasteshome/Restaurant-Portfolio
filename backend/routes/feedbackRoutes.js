const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const { submitFeedback, getFeedbacks, markReviewed } = require("../controllers/feedbackController");

// Customer Access
router.post("/", submitFeedback);

// Admin Access
router.get("/", verifyAdmin, getFeedbacks);
router.patch("/:id/reviewed", verifyAdmin, markReviewed);

module.exports = router;
