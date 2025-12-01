const Restaurant = require("../models/Restaurant");
const Admin = require("../models/Admin"); // ✅ FIX: Import Admin model
const { generateQRCode } = require("../services/qrcodeService");

// ✅ Get restaurant details (for logged-in admin)
exports.getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant_id);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update restaurant info
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(
      req.restaurant_id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Restaurant not found" });

    // Generate new QR code after update
    updated.qr_code_url = await generateQRCode(updated._id);
    await updated.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create restaurant and link to logged-in admin
exports.createRestaurant = async (req, res) => {
  try {
    const { name, logo, location, work_hours } = req.body;

    // Create restaurant
    const restaurant = new Restaurant({ name, logo, location, work_hours });
    await restaurant.save();

    // Link this restaurant to the admin
    await Admin.findByIdAndUpdate(req.admin_id, { restaurant_id: restaurant._id });

    // Generate and attach QR code URL
    restaurant.qr_code_url = await generateQRCode(restaurant._id);
    await restaurant.save();

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
