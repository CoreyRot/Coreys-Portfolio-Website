const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Import contact routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Fix CORS to allow both local & deployed frontends
const allowedOrigins = [
  "http://localhost:3000",
  "https://coreys-portfolio-website-murex.vercel.app",
  "https://www.coreydevstudio.com",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Ensure Routes Exist
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes); // ✅ Should be here!

// ✅ Default Route for Debugging
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Debugging Logs
app.use((req, res, next) => {
  console.log(`🔍 Received ${req.method} request at ${req.url}`);
  next();
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
