require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const ContactMessage = require("../models/Contact");
const router = express.Router();

// ✅ Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer Storage Configuration (Secure)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("❌ Invalid file type. Only PDFs and images are allowed."), false);
    }
  },
});

// ✅ Email Transporter Setup (Make sure App Password is correct)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

// ✅ API Health Check Route
router.get("/", (req, res) => {
  res.status(200).json({ message: "✅ Contact API is working!" });
});

// ✅ POST Route: Handle Form Submission
router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("📩 Received Contact Form Submission:", req.body);

    const { firstName, lastName, email, phone, message, company, website, jobTitle, formType } = req.body;
    const jobDescriptionFile = req.file ? req.file.filename : null;

    // ✅ Validate Required Fields
    if (!firstName || !lastName || !email || !phone || !message || !formType) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Save Message to Database
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
      jobDescription: jobDescriptionFile || null,
    });

    await newMessage.save();
    console.log("✅ Message successfully saved to database!");

    // ✅ Prepare Email Content
    const emailSubject = `New ${formType} Inquiry from ${firstName} ${lastName}`;
    let emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Type:</strong> ${formType}</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      ${website ? `<p><strong>Website:</strong> ${website}</p>` : ""}
      ${jobTitle ? `<p><strong>Job Title:</strong> ${jobTitle}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    let attachments = [];
    if (jobDescriptionFile) {
      const filePath = path.join(uploadDir, jobDescriptionFile);
      if (fs.existsSync(filePath)) {
        attachments.push({
          filename: jobDescriptionFile,
          path: filePath,
        });
      } else {
        console.warn("⚠️ File not found:", filePath);
      }
    }

    // ✅ Send Email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "crotstein99@gmail.com",
      subject: emailSubject,
      html: emailHtml,
      attachments,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!", info.response);
      res.status(201).json({ message: "Message sent successfully!" });
    } catch (emailError) {
      console.error("❌ Error sending email:", emailError);
      res.status(500).json({
        message: "Message saved to database but email delivery failed.",
        emailError: emailError.message,
      });
    }

  } catch (error) {
    console.error("❌ Error in contact form submission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
