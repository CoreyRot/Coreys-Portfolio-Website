const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ Import contact routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON

// ✅ Fix CORS to allow both local & deployed frontends
const allowedOrigins = [
  "http://localhost:3000", // ✅ Allow local development
  "http://192.168.56.1:3000", // ********************************
  "https://coreys-portfolio-website-murex.vercel.app", // ✅ Allow deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🔍 Checking CORS for:", origin || "❌ No Origin Header");
    if (!origin) {
      console.log("✅ Allowing request with no origin (e.g., Postman, direct browser access)");
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("🚨 CORS Blocked Origin:", origin);
      callback(new Error("CORS policy does not allow this origin"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes); // ✅ Add Contact API route

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));