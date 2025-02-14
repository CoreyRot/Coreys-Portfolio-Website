const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Debugging Middleware: Log All Incoming Requests
app.use((req, res, next) => {
  console.log(`📩 [${req.method}] ${req.url} - Body:`, req.body);
  next();
});

// ✅ Fix CORS to allow both local & deployed frontends
const allowedOrigins = [
  "http://localhost:3000",
  "https://coreys-portfolio-website-murex.vercel.app",
  "https://www.coreydevstudio.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn("🚨 CORS Blocked:", origin);
      return callback(new Error("CORS policy does not allow this origin"), false);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Register Routes (AFTER logging middleware)
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
