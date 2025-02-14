const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ContactMessage = require("../models/Contact");
const router = express.Router();

// ✅ Ensure "uploads" folder exists
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

// ✅ API Health Check Route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Contact API!" });
});

// ✅ POST Route: Handle Form Submission
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const {
      firstName = null,
      lastName = null,
      email = null,
      phone = null,
      message = null,
      company = null,
      website = null,
      jobTitle = null,
      formType = null,
    } = req.body;

    const jobDescriptionFile = req.file ? req.file.filename : null;

    if (!firstName || !lastName || !email || !phone || !message || !formType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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
      jobDescription: jobDescriptionFile,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;