const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Import contact routes

dotenv.config(); // Load environment variables

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON requests

// ✅ CORS Configuration (Make sure only your frontend can access the API)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));

// ✅ Connect to MongoDB with better error handling
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop the server if MongoDB fails
  });

//
