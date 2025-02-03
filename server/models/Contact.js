const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  formType: { type: String, required: true, enum: ["job", "freelance", "chat"] },
  company: { type: String, default: null },
  website: { type: String, default: null },
  jobTitle: { type: String, default: null },
  workType: [{ type: String, enum: ["Onsite", "Hybrid", "Remote"], default: [] }],
  salaryRange: { type: String, enum: ["0-40000", "40000-60000", "60000-80000", "80000-100000", "100000+"], default: null },
  jobDescription: { type: String, default: null },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactMessageSchema);
