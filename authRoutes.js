const express = require("express");
const { registerUser, loginUser,getUserByEmail} = require("../controllers/authController");
const router = express.Router();
const jwt = require('jsonwebtoken');
router.get('/logout', (req, res) => {
    // Clear the JWT token stored in the cookies
    res.clearCookie('auth_token'); // Replace 'auth_token' with the name of your cookie
  
    // Send a success response
    return res.status(200).json({ message: 'Logged out successfully' });
  });
  
  module.exports = router;

// Registration route
router.post("/register", registerUser);
router.get("/user/:email", getUserByEmail);

// Login route
router.post("/login", loginUser);

module.exports = router;
