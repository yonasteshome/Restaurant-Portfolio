// controllers/authController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password, restaurant_id } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: "username, email & password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      restaurant_id
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: newAdmin
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    // Create token
    const token = jwt.sign(
      {
        adminId: admin._id,
        restaurant_id: admin.restaurant_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Store in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      message: "Login successful",
      adminId: admin._id,
      restaurant_id: admin.restaurant_id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
