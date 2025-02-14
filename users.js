// routes/users.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// routes/users.js
router.get("/api/users", async (req, res) => {
    try {
      const users = await User.find(); // MongoDB query to fetch users
      console.log(users); // Log the users array
      res.json(users);  // Return the users as JSON
    } catch (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
