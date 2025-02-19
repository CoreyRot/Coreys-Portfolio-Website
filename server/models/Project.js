const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: [String] },
  stackUsed: { type: [String], default: [] },
  liveUrl: { type: String },
  agency: { type: String },
  backlink: { type: String },
});

module.exports = mongoose.model("Project", ProjectSchema, "project");
