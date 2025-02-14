const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ContactMessage = require("../models/Contact");
const router = express.Router();

console.log("🛠️ Initializing Contact Routes...");

// ✅ Ensure the "uploads" folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDFs and images are allowed."), false);
    }
  },
});

// ✅ Debugging API Health Check
router.get("/", (req, res) => {
  console.log("📩 GET /api/contact hit!");
  res.status(200).json({ message: "Welcome to the Contact API!" });
});

// ✅ POST Route: Handle Form Submission
router.post("/", upload.single("file"), async (req, res) => {
  console.log("📩 POST /api/contact hit!");
  console.log("📥 Received Form Data:", req.body);
  console.log("📁 Uploaded File:", req.file ? req.file.filename : "No file uploaded");

  try {
    // ✅ Extract Data Safely and set empty values to null
    const {
      firstName = null,
      lastName = null,
      email = null,
      phone = null,
      message = null,
      company = null,
      website = null,
      jobTitle = null,
      salaryRange = null,
      formType = null,
    } = req.body;

    const jobDescriptionFile = req.file ? req.file.filename : null;

    // ✅ Ensure Required Fields Are Present
    if (!firstName || !lastName || !email || !phone || !message || !formType) {
      console.log("❌ Missing required fields:", { firstName, lastName, email, phone, message, formType });
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("🔍 Processed Data Before Saving:");
    console.log({
      firstName,
      lastName,
      email,
      phone,
      message,
      formType,
      company,
      website,
      jobTitle,
      salaryRange,
      jobDescriptionFile,
    });

    // ✅ Save Contact Message to Database
    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      phone,
      message,
      formType,
      company,
      website,
      jobTitle,
      salaryRange,
      jobDescription: jobDescriptionFile,
    });

    // ✅ Log the data being saved
    console.log("🛠️ Data to be saved to the database:", newMessage);

    await newMessage.save();
    console.log("✅ Form successfully saved to database!");
    res.status(201).json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("❌ Error saving message:");
    console.error("Error Stack Trace:", error.stack); // Log the full error stack trace
    console.error("Error Details:", error); // Log the full error object
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

console.log("✅ Contact Routes Loaded!");
module.exports = router;