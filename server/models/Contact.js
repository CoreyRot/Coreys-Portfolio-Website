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
    salaryRange: {
      type: String,
      enum: ["0-40000", "40000-60000", "60000-80000", "80000-100000", "100000+"],
      required: false,
      default: null,
    },
    jobDescription: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

// ✅ Log Before Saving
ContactMessageSchema.pre("save", function (next) {
  console.log("🛠️ Preparing to Save to Database...");
  console.log("📝 Data to be Saved:", this);

  // ✅ Safely check for .length and log undefined fields
  Object.entries(this.toObject()).forEach(([key, value]) => {
    if (value === undefined) {
      console.error(`❌ ERROR: ${key} is undefined!`);
    } else if (value === null) {
      console.log(`⚠️ ${key} is null.`);
    } else if (typeof value === "string" || Array.isArray(value)) {
      console.log(`✅ ${key} has length:`, value?.length);
    } else {
      console.log(`⚠️ ${key} is not a string or array, skipping length check.`);
    }
  });

  next();
});

module.exports = mongoose.model("Contact", ContactMessageSchema);