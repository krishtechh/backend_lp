const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");

router.post("/join", async (req, res) => {
  try {

    const { email, user_type } = req.body;

    if (!email || !user_type) {
      return res.status(400).json({
        message: "Email and user type required"
      });
    }

    const existing = await Waitlist.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const user = new Waitlist({
      email,
      user_type
    });

    await user.save();

    res.status(201).json({
      message: "Added to waitlist"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;