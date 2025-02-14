const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const ContactMessage = require("../models/Contact");

const router = express.Router();

console.log("🛠️ Initializing Contact Routes...");

// ✅ Ensure the "uploads" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer Storage Configuration with File Type & Size Validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, PNG, and JPEG are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Middleware for Async Error Handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ✅ Centralized Error Handler
router.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// ✅ GET: Debugging API Health Check
router.get("/", (req, res) => {
  console.log("📩 GET /api/contact hit!");
  res.status(200).json({ message: "Welcome to the Contact API!" });
});

// ✅ POST: Handle Form Submission with Validation
router.post(
  "/",
  upload.single("file"),
  [
    body("firstName").trim().notEmpty().withMessage("First name is required"),
    body("lastName").trim().notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("phone").matches(/^[0-9+\-()\s]+$/).withMessage("Invalid phone number"),
    body("message").trim().notEmpty().withMessage("Message cannot be empty"),
    body("formType").trim().notEmpty().withMessage("Form type is required"),
    body("workType").optional().customSanitizer((value) => (typeof value === "string" ? [value] : value || [])),
  ],
  asyncHandler(async (req, res) => {
    console.log("📩 POST /api/contact hit!");
    console.log("📥 Received Data:", req.body);
    console.log("📁 Uploaded File:", req.file ? req.file.filename : "None");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      company,
      website,
      jobTitle,
      workType,
      salaryRange,
      formType,
    } = req.body;

    const jobDescriptionFile = req.file ? req.file.filename : null;

    // ✅ Save Contact Message to Database
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
      workType: workType.length ? workType : [],
      salaryRange: salaryRange || null,
      jobDescription: jobDescriptionFile || null,
    });

    await newMessage.save();
    console.log("✅ Form successfully saved to database!");
    res.status(201).json({ message: "Message sent successfully!" });
  })
);

console.log("✅ Contact Routes Loaded!");

module.exports = router;