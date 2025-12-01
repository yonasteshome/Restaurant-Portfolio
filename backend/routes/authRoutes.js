const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin, logoutAdmin } = require("../controllers/authController");

// Admin setup
router.post("/register", createAdmin);

// Authentication
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;
