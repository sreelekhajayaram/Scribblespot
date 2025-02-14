const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController'); // Import removeFromCart

// POST - Add item to cart
router.post('/', addToCart);

// GET - Get all cart items
router.get('/', getCart);

// DELETE - Remove item from cart by ID
router.delete('/:id', removeFromCart); // New route for deleting cart items by ID

module.exports = router;
