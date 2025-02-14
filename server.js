const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const CartItem = require("./models/CartItem");
const bcrypt = require("bcryptjs"); // Add bcrypt to hash passwords
const User = require("./models/User"); // Import the User model// Import CartItem model
const jwt = require("jsonwebtoken");
const Wishlist = require("./models/wishlist");
const wishlistRoutes = require('./routes/wishlistRoutes');
const userRoutes = require('./routes/userRoutes');
const multer = require("multer");
const path = require("path");
const session = require("express-session");// Import Routes

const app = express();
const PORT = 5000;
const JWT_SECRET = "shree";

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  
};
app.use(cors({
  origin: 'http://localhost:5173', // Assuming your frontend is running on port 3000
  methods: 'GET,POST,PUT,DELETE',
}));

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // ✅ Ensure this is at the top
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api", userRoutes);
app.use("/api/products", require("./routes/productRoutes"));
// Session configuration
app.use(
  session({
    secret: "shree", // Secret for session signing
    resave: false, // Avoid session resaving if not modified
    saveUninitialized: true, // Save new sessions even if they are not modified
    cookie: { secure: false, maxAge: 3600000 }, // 1 hour expiry for session cookie
  })
);

// MongoDB Connection


// Multer Storage Configuration for Profile Picture Upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Review Schema (Updated to ensure productId)
const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  profilePic: { type: String },
  createdAt: { type: Date, default: Date.now }, // ✅ Automatically stores review timestamp
});

const Review = mongoose.model("Review", reviewSchema);

// Get reviews by product ID
app.get("/api/reviews/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }); // Fetch reviews for the specific product
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});


// ✅ Post a new review (With Image Upload)
app.post("/api/reviews", upload.single("profilePic"), async (req, res) => {
  try {
    const { productId, username, rating, comment } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : "";

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ productId, username });
    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this product." });
    }

    const newReview = new Review({ productId, username, rating, comment, profilePic });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Error saving review" });
  }
});


// ✅ Delete a review by ID
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting review" });
  }
});
// ✅ Get All Reviews (For Admin)
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from DB
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});


app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true, required: true }, // Add a unique order_id
  name: String,
  description: String,
  price: Number,
  image: String,
  quantity: Number,
  userEmail: String,
  paymentMethod: String,
  status: { type: String, default: "Processing" },
  createdAt: { type: Date, default: Date.now },
});

// Create Model
const Order = mongoose.model("Order", orderSchema);

// Place Order API
const { v4: uuidv4 } = require("uuid"); // Import UUID

app.post("/api/orders", async (req, res) => {
  try {
    console.log("Received Order:", req.body);

    const { name, description, price, image, quantity, userEmail, paymentMethod, status } = req.body;

    if (!userEmail) {
      return res.status(400).json({ success: false, message: "User email is required" });
    }

    const newOrder = new Order({
      order_id: uuidv4(), // Generate a unique ID
      name,
      description,
      price,
      image,
      quantity,
      userEmail,
      paymentMethod,
      status,
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/orders/user", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "User email is required" });
    }

    const orders = await Order.find({ userEmail: email });

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this email" });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

  app.put("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order" });
  }
});

// ✅ Delete a review by ID (Admin Only)
app.delete("/api/admin/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting review" });
  }
});

mongoose
  .connect(
    "mongodb+srv://sreelekhaajayaram:sreelekhajayaram@sreelekhajayaram.are1q.mongodb.net/store",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Admin credentials (for demonstration purposes; replace with database logic)
const ADMIN_EMAIL = "admin123@gmail.com";
const ADMIN_PASSWORD = "123egofree";

// Admin login route
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({
      success: true,
      message: "Admin login successful",
      token,
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid admin email or password",
  });
});
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
  if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};


// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// User Login Endpoint (Session-based)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Set session data
    req.session.user = { id: user._id, email: user.email, name: user.name };
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Logout Endpoint (Clear session)
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to log out" });
    }
    res.status(200).json({ success: true, message: "Logout successful" });
  });
});

// Middleware to check if user is logged in
const verifyUserSession = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized access" });
  }
  next();
};

// Admin: Manage Users (Placeholder for GET /api/users)
app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users)) // Ensure you're sending back JSON
    .catch(err => res.status(500).json({ message: "Error fetching users" }));
});


// Cart API Endpoints

// GET /api/cart - Fetch all cart items
app.get("/api/cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find(); // Retrieve all cart items from DB
    res.status(200).json(cartItems); // Respond with cart items in JSON format
  } catch (err) {
    console.error("Error getting cart items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/cart - Add an item to the cart
app.post("/api/cart", async (req, res) => {
  console.log("Received Request Body:", req.body); // ✅ Log the request

  const { name, description, price, image, quantity } = req.body;

  // ✅ Validate required fields
  if (!name || !description || !price || !image) {
    console.error("Validation Failed: Missing fields", req.body);
    return res.status(400).json({ error: "All fields (name, description, price, image) are required" });
  }

  try {
    // ✅ Check if item already exists
    const existingItem = await CartItem.findOne({ name });

    if (existingItem) {
      return res.status(400).json({ error: "Item already exists in the cart" });
    }

    const newItem = new CartItem({
      name,
      description,
      price,
      image,
      quantity: quantity || 1,
    });

    await newItem.save();
    console.log("✅ Item added successfully:", newItem);
    res.status(201).json({ message: "Item added to cart successfully", item: newItem });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE /api/cart/:itemId - Remove an item from the cart
app.delete("/api/cart/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await CartItem.findByIdAndDelete(itemId);

    if (deletedItem) {
      res.status(200).json({ message: "Item removed successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    console.error("Error removing item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// GET /api/wishlist - Fetch all wishlist items without token
app.get("/api/wishlist", async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();

    if (!wishlistItems || wishlistItems.length === 0) {
      return res.status(404).json({ message: "No wishlist items found." });
    }

    res.json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Failed to fetch wishlist items." });
  }
});

// Wishlist API Endpoints
app.use("/api/wishlist", wishlistRoutes);

// DELETE /api/wishlist/:itemName - Remove an item from the wishlist
// Backend route for deleting wishlist item by name

// User Registration Endpoint
app.post("/api/register", async (req, res) => {
  const { name,email, password, mobile, address, city, state, country, pincode, landmark } = req.body;

  // Validate input
  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ error: "Name,Email, password, and mobile are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      mobile,
      address,
      city,
      state,
      country: country || "India", // Default to India if country is not provided
      pincode,
      landmark,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: newUser._id,name: newUser.name, email: newUser.email, mobile: newUser.mobile },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Example data (You should replace this with actual data from your database)
const users = [
  {
    id: 1,
    name:"shree",
    email: "user@example.com",
    address: "123 Main St",
    mobile: "123-456-7890",
    city: "Sample City",
    state: "Sample State",
    landmark: "Near Park",
  },
];

// Route to get user details (no token required anymore)
app.get("/api/user", (req, res) => {
  // In this example, we are just returning static data.
  // Ideally, this would come from your database, and you can handle user sessions or cookies if needed.
  res.json({
    name:"shree",
    email: "user@example.com",
    address: "123 Main St",
    mobile: "123-456-7890",
    city: "Sample City",
    state: "Sample State",
    landmark: "Near Park",
  });
});


// Handle unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(cors({ origin: "*" }));
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
