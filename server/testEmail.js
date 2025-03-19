require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Email Options
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "crotstein99@gmail.com", // Change this if you want to send to another email
  subject: "Test Email from Node.js",
  text: "This is a test email to verify Nodemailer is working!",
};

// ✅ Send Email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("❌ Error sending test email:", err);
  } else {
    console.log("✅ Test email sent successfully:", info.response);
  }
});
