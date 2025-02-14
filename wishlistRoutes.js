// routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Get all wishlist items
router.get("/", getWishlist);

// Add an item to the wishlist
router.post("/", addToWishlist);

// Remove an item from the wishlist by ID
router.delete("/:id", removeFromWishlist);

module.exports = router;
