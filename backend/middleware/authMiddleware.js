// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ error: "Not authorized (no token)" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId);
    if (!admin)
      return res.status(403).json({ error: "Admin not found" });

    req.admin_id = admin._id;
    req.restaurant_id = decoded.restaurant_id;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
