const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Change if frontend different
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes Import — MATCHES YOUR FILES NOW
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuItemRoutes);
app.use("/api/feedback", feedbackRoutes);

// ✅ Static folder to serve QR images
app.use("/uploads", express.static("uploads"));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ Restaurant QR Menu API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
