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
  "http://localhost:3000", // ✅ Local development
  "http://192.168.56.1:3000", // ✅ Internal network testing
  "https://coreys-portfolio-website-murex.vercel.app", // ✅ Deployed frontend
  "https://www.coreydevstudio.com", // ✅ Production frontend
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

// ✅ Graceful Shutdown Handling
process.on("SIGINT", async () => {
  console.log("🔴 Shutting down server...");
  await mongoose.connection.close();
  console.log("🔴 MongoDB disconnected.");
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));