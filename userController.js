const User = require("../models/User");

// Fetch logged-in user's details
exports.getUserDetails = async (req, res) => {
  try {
    // Get email from request params or query
    const { email } = req.params; // Or use req.query.email

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const user = await User.findOne({ email }).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
