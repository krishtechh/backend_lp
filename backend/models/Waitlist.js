const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  user_type: {
    type: String,
    enum: ["freelancer", "cofounder", "founder"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Waitlist", waitlistSchema);