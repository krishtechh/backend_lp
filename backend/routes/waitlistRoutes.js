const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");
const { sendWaitlistEmail } = require("../utils/email");

router.post("/join", async (req, res) => {
  try {

    const { email, user_type, phoneNumber } = req.body;

    if (!email || !user_type) {
      return res.status(400).json({
        message: "Email and user type are required"
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
      user_type,
      phoneNumber
    });

    await user.save();

    // Send confirmation email
    await sendWaitlistEmail(email);

    res.status(201).json({
      message: "Added to waitlist"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;