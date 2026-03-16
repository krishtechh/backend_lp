const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const waitlistRoutes = require("./routes/waitlistRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/waitlist", waitlistRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log(err);
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});