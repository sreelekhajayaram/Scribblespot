const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { getUserDetails } = require("../controllers/userController");


const router = express.Router();
// Route to fetch user details using email ID
router.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile, address, city, state, country, pincode, landmark } = req.body;

    if (!name || !email || !password || !mobile ||!address ||!city ||!country ||!pincode ||!state) {
      return res.status(400).json({ error: "Name, Email, password,address,city,country,pincode,state and mobile are required" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,  // Added name field
      email,
      password: hashedPassword,
      mobile,
      address,
      city,
      state,
      country,
      pincode,
      landmark,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

module.exports = router;
