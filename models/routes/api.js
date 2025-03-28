const express = require("express");
const router = express.Router();
const User = require("../../models/User"); // Import the User model

// Register User Route
router.post("/register", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debug log

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data received." });
    }

    const { firstName, lastName, phone, occupation, experience, contactTime } = req.body;

    // Check if phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this phone number already exists." });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      phone,
      occupation,
      experience,
      contactTime,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

module.exports = router;
