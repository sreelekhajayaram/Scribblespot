// controllers/wishlistController.js
const Wishlist = require("../models/wishlist");

// Fetch all wishlist items
exports.getWishlist = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist items", error });
  }
};

// Add an item to the wishlist (Prevents Duplicates)
exports.addToWishlist = async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    // Check if the item already exists in the wishlist
    const existingItem = await Wishlist.findOne({ name, description, price, image });

    if (existingItem) {
      return res.status(400).json({ message: "Item already exists in wishlist" });
    }

    // If not, add new item
    const newItem = new Wishlist({ name, description, price, image });
    const savedItem = await newItem.save();

    res.status(201).json({ message: "Item added to wishlist", data: savedItem });
  } catch (error) {
    console.error("❌ Error adding item to wishlist:", error);
    res.status(500).json({ message: "Failed to add item to wishlist", error: error.message });
  }
};


// Remove an item from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Wishlist.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }
    res.status(200).json({ message: "Item removed from wishlist", data: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item from wishlist", error });z
  }
};
