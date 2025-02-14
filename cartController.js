const CartItem = require('../models/CartItem');

// Controller function to remove item from cart
const removeFromCart = async (req, res) => {
  const { id } = req.params; // Get item ID from the request parameters

  try {
    // Find and remove the item by its ID
    const result = await CartItem.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item removed successfully" });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
