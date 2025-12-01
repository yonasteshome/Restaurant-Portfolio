exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId);

    if (!admin) return res.status(403).json({ error: "Admin not found" });

    req.admin_id = admin._id;
    req.restaurant_id = decoded.restaurant_id || admin.restaurant_id;

    if (!req.restaurant_id) {
      return res.status(400).json({ error: "Restaurant ID missing for admin" });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
