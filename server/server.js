const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Import contact routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); // Enable CORS

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes); // ✅ Add Contact API route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
