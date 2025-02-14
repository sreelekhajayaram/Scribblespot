const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Added name field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  country: { type: String, default: "India" },
  pincode: String,
  landmark: String,
});

module.exports = mongoose.model("User", UserSchema);
