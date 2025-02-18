const express = require("express");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Project = require("../models/Project.js");

const router = express.Router();

/** ✅ Middleware to validate MongoDB ObjectId */
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid project ID format" });
  }
  next();
};


const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/** ✅ Get all projects */
router.get("/", asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.json({ success: true, data: projects });
}));

/** ✅ Get a single project by ID */
router.get("/:id", validateObjectId, asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });

  res.json({ success: true, data: project });
}));

/** ✅ Create a new project with input validation */
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Project title is required"),
    body("category").trim().notEmpty().withMessage("Project category is required"),
    body("imageUrl").trim().notEmpty().withMessage("Project image URL is required"),
    body("description").trim().optional(),
    body("stackUsed").optional().isArray().withMessage("Stack should be an array of technologies"),
    body("liveUrl").trim().optional().isURL().withMessage("Invalid URL format"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });
  })
);

/** ✅ Update a project by ID */
router.put(
  "/:id",
  validateObjectId,
  [
    body("title").optional().trim().notEmpty().withMessage("Project title cannot be empty"), // ✅ Fixed field name
    body("category").optional().trim().notEmpty().withMessage("Project category cannot be empty"),
    body("imageUrl").optional().trim().notEmpty().withMessage("Project image URL cannot be empty"),
    body("description").optional().trim(),
    body("stackUsed").optional().isArray().withMessage("Stack should be an array of technologies"),
    body("liveUrl").optional().trim().isURL().withMessage("Invalid URL format"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProject) return res.status(404).json({ error: "Project not found" });

    res.json({ success: true, data: updatedProject });
  })
);

/** ✅ Delete a project by ID */
router.delete("/:id", validateObjectId, asyncHandler(async (req, res) => {
  const deletedProject = await Project.findByIdAndDelete(req.params.id);
  if (!deletedProject) return res.status(404).json({ error: "Project not found" });

  res.json({ success: true, message: "Project deleted successfully" });
}));

module.exports = router;
