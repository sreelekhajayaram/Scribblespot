const express = require("express");
const router = express.Router(); // Ensure correct model import

// ✅ POST New Product
router.post("/api/products", async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    
    // 🛑 Check if all required fields are provided
    if (!name || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Create new product
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error in backend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET all products
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
