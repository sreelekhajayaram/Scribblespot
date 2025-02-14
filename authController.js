const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config"); // Ensure this points to the right location

// Register a new user (already provided by you)
exports.registerUser = async (req, res) => {
  const {
    name, // Added name field
    email,
    password,
    mobile,
    address,
    city,
    state,
    country,
    pincode,
    landmark,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name, // Save name
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

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

     // Store user session
     req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      pincode: user.pincode,
      landmark: user.landmark,
    };

    res.status(200).json({
      success: true,
      token,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
        landmark: user.landmark,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
// Get user details by email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

