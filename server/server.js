const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Import contact routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // ✅ Middleware for parsing JSON
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Debugging Logs
console.log("🛠️ Initializing API Routes...");

// ✅ Check if contactRoutes is being loaded
if (contactRoutes) {
  console.log("✅ Contact routes loaded!");
} else {
  console.log("❌ Contact routes failed to load.");
}

// ✅ Fix CORS to allow both local & deployed frontends
const allowedOrigins = [
  "http://localhost:3000",
  "https://coreys-portfolio-website-murex.vercel.app",
  "https://www.coreydevstudio.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🔍 Checking CORS for:", origin || "❌ No Origin Header");
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.error("🚨 CORS Blocked Origin:", origin);
      return callback(new Error("CORS policy does not allow this origin"), false);
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Register Routes
console.log("📌 Registering API Routes...");
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes); // ✅ Ensure this line is here!

// ✅ Default Route
app.get("/", (req, res) => {
  console.log("📩 GET / hit");
  res.send("Backend is running 🚀");
});

// ✅ Log Unrecognized Routes
app.use((req, res, next) => {
  console.log(`⚠️ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));