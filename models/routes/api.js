const express = require("express");
const router = express.Router();
const { newUser } = require("../../models/User");

router.post("/register", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debug log

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data received." });
    }

    // Save the user
    const user = await newUser(req.body);
    res.status(201).json({ success: true, message: "User registered successfully!", user });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

module.exports = router;
