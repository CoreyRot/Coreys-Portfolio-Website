const express = require("express");
const router = express.Router();

// ✅ Test Route to Ensure API is Working
router.get("/", async (req, res) => {
  console.log("📩 GET /api/contact hit!");
  return res.status(200).json({ message: "Welcome to the Contact API!" });
});

module.exports = router;
