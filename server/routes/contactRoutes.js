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
const upload = multer({ storage });

// ✅ GET Route: Debugging API Health Check
router.get("/", (req, res) => {
  console.log("📩 GET /api/contact hit!");
  res.status(200).json({ message: "Welcome to the Contact API!" });
});

// ✅ POST Route: Handle Form Submission
router.post("/", upload.single("file"), async (req, res) => {
  console.log("📩 POST /api/contact hit!");
  console.log("📥 Received Form Data:", req.body);
  console.log("📁 Uploaded File:", req.file);

  try {
    const { firstName, lastName, email, phone, message, company, website, jobTitle, workType, salaryRange, formType } = req.body;
    const jobDescriptionFile = req.file ? req.file.filename : null;

    // ✅ Ensure Required Fields Are Present
    if (!firstName || !lastName || !email || !phone || !message || !formType) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Convert `workType` to an array if received as a string
    const workTypeArray = typeof workType === "string" ? [workType] : workType || [];

    // ✅ Save Contact Message
    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      phone,
      message,
      formType,
      company: company || null,
      website: website || null,
      jobTitle: jobTitle || null,
      workType: workTypeArray.length > 0 ? workTypeArray : [],
      salaryRange: salaryRange || null,
      jobDescription: jobDescriptionFile || null,
    });

    await newMessage.save();
    console.log("✅ Form successfully saved to database!");
    res.status(201).json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

console.log("✅ Contact Routes Loaded!");

module.exports = router;
