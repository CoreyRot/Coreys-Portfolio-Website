const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9+\-()\s]+$/, "Invalid phone number format"],
    },
    message: { type: String, required: true },
    formType: { type: String, required: true, enum: ["job", "freelance", "chat"] },
    company: { type: String, required: false, default: null },
    website: { type: String, required: false, default: null },
    jobTitle: { type: String, required: false, default: null },
    jobDescription: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactMessageSchema);