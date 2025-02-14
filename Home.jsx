import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import InfoIcon from "@mui/icons-material/Info";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const API_BASE_URL = "http://localhost:5000/api/products";

  // Fetch products from backend once when the component mounts
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log("✅ Fetched Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setSnackbarMessage("Failed to fetch products!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update product details
  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, updatedData);
      fetchProducts();
      setSnackbarMessage("Product updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("❌ Error updating product:", error);
      setSnackbarMessage("Failed to update product!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${currentProduct._id}`, currentProduct);
      } else {
        await axios.post(API_BASE_URL, currentProduct);
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("❌ Error saving product", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product", error);
    }
  };

  // Hardcoded items array
  const hardcodedItems = [
    {
      id: 1,
      name: "Notebooks Pack of 4 Books",
      description: "High-quality ruled notebook for school and office use.",
      price: 310,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13819311a.webp",
      stock: 310,
    },
    {
      id: 2,
      name: "Multicolour Pen",
      description: "Smooth and long-lasting ballpoint pen.",
      price: 290,
      image: "https://m.media-amazon.com/images/I/4120mZ990kL._SY450_.jpg",
      stock: 190,
    },
    {
      id: 3,
      name: "Apsara Writing Kit - Multicolor",
      description: "Smooth and Efficient writting and erasing for school kids",
      price: 550,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13210773a.webp",
      stock: 10,
    },
    {
      id: 4,
      name: "24 Pcs Solid Watercolor Paint Set",
      description: "High-quality paint for colouring purpose",
      price: 619,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16207402a.webp",
      stock: 515,
    },
    {
      id: 5,
      name: "Kuber Industries Disney Mickey Mouse 15 inch Polyster School Bag",
      description: "Durable school bag with multiple compartments for kids.",
      price: 650,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/8734655a.webp",
      stock: 610,
    },
    // ... more hardcoded items
    {
      id: 6,
      name: "Motu Patlu Sipper Plastic Water Bottle (450 Ml, Multicolour, 1 Piece Sipper Waer Bottle)",
      description: "Stainless steel water bottle with leak-proof lid.",
      price: 400,
      image: "https://media-uk.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000011374050-1000011374049-22062022_01-2100.jpg",
      stock: 425,
    },
    {
      id: 7,
      name: "Boboiboy Fusion 5 in 1 Stationery Set With Pencil Case Pencil Eraser",
      description: "Compact pencil box with multiple sections for organizing stationery.",
      price: 350,
      image: "https://media.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000014254686-Multi-MULTI-1000014254686_01-2100.jpg",
      stock: 450,
    },
    {
      id: 8,
      name: " 13in1 Pencil & Eraser Set - (Multicolor)",
      description: "Pencil and eraser set for stationery use",
      price: 335,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/12146107a.webp",
      stock: 235,
    },
    {
      id: 9,
      name: "Camel - Oil Pastels - 50 Shades",
      description: "Best recommended for sketching piurpose for kids",
      price: 520,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/90650a.webp",
      stock: 50,
    },
    {
      id: 10,
      name: "Lunch Box",
      description: "Leak-proof tiffin box for carrying meals.",
      price: 570,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15454302a.webp",
      stock: 25,
    },
    {
      id: 11,
      name: "Abacus Counting Frame -Blue",
      description: "Helps kids by making their math skills sharper",
      price: 480,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15892899b.webp",
      stock: 60,
    },
    {
      id: 12,
      name: "Fancy Umbrella",
      description: "Compact and durable umbrella for rainy days.",
      price: 450,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/16275653a.webp",
      stock: 15,
    },
    {
      id: 13,
      name: "Coloring Book for kids",
      description: "Fun and creative coloring book for kids.",
      price: 220,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18652866a.webp",
      stock: 40,
    },
    {
      id: 14,
      name: "Spiderman Pencil Box",
      description: "Efficient for carrying statinery sets for school.",
      price: 280,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13730303a.webp",
      stock: 30,
    },
    {
      id: 15,
      name: "Projector table painting set - Multicolor",
      description: "Efficient for kids to learn sketching",
      price: 430,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10989798a.webp",
      stock: 100,
    },
    {
      id: 16,
      name: "Unicorn Themed Pouch",
      description: "Efficient for carrying stationery sets for school.",
      price: 280,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17957370a.webp",
      stock: 100,
    },
    {
      id: 17,
      name: "Classmate Drawing Notebook Unruled 36 Pages ",
      description: "Efficient for drawing and sketching.",
      price: 119,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/604512a.webp",
      stock: 100,
    },
    {
      id: 18,
      name: " Metal Open Compass - 9 Pcs Set |Geometry Box ",
      description: "Efficient for doing geometrical figures for school.",
      price: 390,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10110983a.webp",
      stock: 100,
    },
    {
      id: 19,
      name: "ZOE Happy Face Erasers -Yellow",
      description: "Efficient for erasing pencil scribblings",
      price: 140,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565181a.webp",
      stock: 100,
    },
    {
      id: 20,
      name: "SKIP HOP ZOO SNACK CUP Pug",
      description: "Efficient for carrying snacks for kids.",
      price: 360,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17539059a.webp",
      stock: 100,
    },
    {
      id: 21,
      name: "Smily kiddos Stationery set Space Theme",
      description: "Spacious pencil case with Multi-layer segmentation to hold many pens and pencils",
      price: 280,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18295914a.webp",
      stock: 100,
    },
    {
      id: 22,
      name: "Jungle Magic Doodle Board - Green",
      description: "Best Gift for Kids Birthday Gifts, Return Gifts, Party Gifts, Festival Gifts, School Supplies",
      price: 215,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/17942197a.webp",
      stock: 100,
    },
    {
      id: 23,
      name: "FLICK IN Stationary Set for Kids, School Supplies Stationary Kit Items",
      description: "Package includes set of 6 stationary items for school use.",
      price: 420,
      image: "https://m.media-amazon.com/images/I/61DxX1zr+bL._SL1129_.jpg",
      stock: 100,
    },
    {
      id: 24,
      name: "blank art canvas board panel",
      description: "Efficient for beginners for painting.",
      price: 360,
      image: "https://s.alicdn.com/@sc04/kf/H5e2fec3ff8d943839ddfc2a0e78c247c6.jpg_720x720q50.jpg",
      stock: 100,
    },
    {
      id: 25,
      name: "Space Theme Sharpener - Dark Blue",
      description: "Adorable & highly appealing sharpener for kids ",
      price: 150,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15564918a.webp",
      stock: 100,
    },
    {
      id: 26,
      name: "Pencils Set -36 Pieces",
      description: "Pencil sets are the perfect gift for your young ones",
      price: 220,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/15565168f.webp",
      stock: 100,
    },
    {
      id: 27,
      name: "Happy Bedtime Stories - English",
      description: "thoughtful compilation of classic stories ",
      price: 230,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/10454356a.webp",
      stock: 100,
    },
    {
      id: 28,
      name: "Marvel Spiderman School Backpack ",
      description: " The bag is suitable for school going children.",
      price: 568,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/14058203a.webp",
      stock: 100,
    },
    {
      id: 29,
      name: " 8 in 1 Easel board ",
      description: "Make your kid's learning time more interesting and fun with this Board Easel. ",
      price: 597,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/9303149a.webp",
      stock: 100,
    },
    {
      id: 30,
      name: "School Bus Shape Metal Pencil Box",
      description: "metal pencil box with unique toy vehicle bus pattern",
      price: 342,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11083968a.webp",
      stock: 100,
    },
    {
      id: 31,
      name: "Full Sleeves Shark Theme Hooded Rain Coat",
      description: "Efficient for kids in rain",
      price: 478,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/11652633a.webp",
      stock: 100,
    },
    {
      id: 32,
      name: "Puffy Original A4 Stickers",
      description: "Barbie A4 Foam Sparkle Sticker is ideal to stimulate the imagination of your kids. ",
      price: 180,
      image: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/13311925a.webp",
      stock: 100,
    },

  ];
  
  // Merge hardcoded items with fetched products
  const allProducts = [...hardcodedItems, ...products];
  
  // Fix: Use allProducts instead of undefined "items" when filtering
  const filteredItems = allProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async (item) => {
    console.log("📦 Item to be added:", item);
    try {
      const requestBody = {
        name: item.name?.trim(),
        description: item.description?.trim(),
        price: parseFloat(item.price),
        image: item.image,
        quantity: item.quantity || 1,
      };
      console.log("🚀 Sending request with:", requestBody);
      const response = await axios.post("http://localhost:5000/api/cart", requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Item added successfully:", response.data);
      setCartItems([...cartItems, response.data]);
      setSnackbarMessage(`${item.name} added to your cart!`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        `❌ Failed to add "${item.name}" to cart. Please try again.`;
      console.error("❌ Error adding item to cart:", errorMessage);
      setSnackbarMessage(`❌ ${errorMessage}`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddToWishlist = async (item) => {
    if (!item || !item.name) {
      console.error("❌ Invalid item passed to handleAddToWishlist:", item);
      alert("❌ Error: Invalid item data.");
      return;
    }
    try {
      const isDuplicate = wishlist.some(
        (wishlistItem) => wishlistItem?.name === item.name
      );
      if (isDuplicate) {
        alert(`❌ "${item.name}" is already in your wishlist!`);
        return;
      }
      const requestBody = {
        name: item.name?.trim(),
        description: item.description?.trim(),
        price: item.price,
        image: item.image,
      };
      const response = await axios.post(
        "http://localhost:5000/api/wishlist",
        requestBody
      );
      console.log("✅ Item added successfully:", response.data);
      setWishlist([...wishlist, response.data.item]);
      alert(`✔️ "${item.name}" added to wishlist!`);
    } catch (err) {
      console.error("❌ Error adding item to wishlist:", err);
      alert(`Item "${item.name}" already exists in your wishlist.`);
    }
  };

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { item } });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setSnackbarMessage("Successfully logged out!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setOpenLogoutDialog(true);
  };

  const isLoggedIn = localStorage.getItem("userToken");

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
    navigate("/login");
  };

  const handleClose = () => {
    setAboutOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "1343px",
        backgroundColor: "#f5f5f6",
        backgroundSize: "100px",
        backgroundPosition: "fixed",
      }}
    >
      {/* Marquee Text */}
      <Box
        sx={{
          backgroundColor: "#1A237E",
          color: "white",
          padding: "2px 0",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.1rem",
          fontFamily: "times",
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <marquee behavior="scroll" direction="left">
          50% Discount on Your First Order! Shop Now! 🛒
        </marquee>
      </Box>

      <AppBar position="static" sx={{ backgroundColor: "#1A237E" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                marginRight: 2,
                color: "white",
                backgroundColor: "linear-gradient(45deg, #6a11cb, #2575fc)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                fontSize: "1.5rem",
                borderRadius: "30%",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <AccountCircleIcon sx={{ fontSize: "2.5rem", color: "lightblue" }} />
            </IconButton>

            <Box
              component="img"
              src="https://img.favpng.com/1/2/13/pencil-case-illustration-png-favpng-97LeVbnq8MvxwtiKQvTW2Nvvv.jpg"
              alt="Scribble Spot Logo"
              sx={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                marginRight: 2,
                border: "2px solid #6a11cb",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontFamily: "cursive",
              marginLeft: "8px",
              animation: "disco 1.5s infinite",
              "@keyframes disco": {
                "0%": { color: "#ff0000" },
                "25%": { color: "#00ff00" },
                "50%": { color: "#0000ff" },
                "75%": { color: "#ffff00" },
                "100%": { color: "#ff00ff" },
              },
            }}
          >
            Scribble Spot
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 2,
                padding: "2px 8px",
                marginRight: 2,
              }}
            >
              <SearchIcon sx={{ color: "#1A237E" }} />
              <InputBase
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                sx={{ marginLeft: 1, width: "200px" }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "bold",
                "&:hover": { backgroundColor: "red", color: "#fff" },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                fontWeight: "bold",
                "&:hover": { backgroundColor: "red" },
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1A237E",
            color: "#fff",
            paddingTop: "20px",
            width: "250px",
          },
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#fff",
            "&:hover": { backgroundColor: "red" },
          }}
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </IconButton>

        <List>
          <ListItem
            button
            onClick={() => navigate("/profile")}
            sx={{
              "&:hover": { backgroundColor: "red", color: "black" },
            }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </IconButton>
            <ListItemText primary="My Profile" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/cart")}
            sx={{
              "&:hover": { backgroundColor: "red", color: "black" },
            }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <ShoppingCartIcon />
            </IconButton>
            <ListItemText primary="My Cart" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/orders")}
            sx={{
              "&:hover": { backgroundColor: "green", color: "black" },
            }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <ListAltIcon />
            </IconButton>
            <ListItemText primary="My Orders" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/wishlist")}
            sx={{
              "&:hover": { backgroundColor: "red", color: "black" },
            }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <FavoriteIcon />
            </IconButton>
            <ListItemText primary="Wishlist" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            onClick={handleLogout}
            sx={{
              "&:hover": { backgroundColor: "red", color: "black" },
            }}
          >
            <IconButton sx={{ color: "red" }}>
              <ExitToAppIcon />
            </IconButton>
            <ListItemText primary="Logout" sx={{ color: "#fff" }} />
          </ListItem>

          <ListItem
            button
            onClick={() => setAboutOpen(true)}
            sx={{
              "&:hover": { backgroundColor: "red", color: "black" },
            }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <InfoIcon />
            </IconButton>
            <ListItemText primary="About Us" sx={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Drawer>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id || item._id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, height: "100%" }}>
                <Box sx={{ position: "relative" }}></Box>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  onClick={() => handleProductClick(item.id)}
                  sx={{ cursor: "pointer" }}
                />
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "8px",
                  }}
                >
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleAddToWishlist({
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    sx={{
                      backgroundColor: "lightgrey",
                      padding: "8px",
                    }}
                  >
                    <FavoriteIcon sx={{ color: "red" }} />
                  </IconButton>
                </Box>

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => handleProductClick(item.id)}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                    ₹{item.price}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <button
                      onClick={() =>
                        handleAddToCart({
                          name: item.name,
                          description: item.description,
                          price: item.price,
                          image: item.image,
                          quantity: 1,
                        })
                      }
                      style={{
                        padding: "8px 16px",
                        background: "blue",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                    <Snackbar
                      open={openSnackbar}
                      autoHideDuration={3000}
                      onClose={handleSnackbarClose}
                    >
                      <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                        {snackbarMessage}
                      </Alert>
                    </Snackbar>
                    <Box>
                      <button
                        onClick={() => handleBuyNow(item)}
                        style={{
                          padding: "8px 16px",
                          width: "242px",
                          background: "purple",
                          color: "yellow",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Buy Now
                      </button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={aboutOpen}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 20, padding: "0px", width: "500px" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            bgcolor: "#1A237E",
            color: "white",
            fontFamily: "vendana",
            fontStretch: "extra-expanded",
            fontWeight: "bolder",
          }}
        >
          About Scribble Spot
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom sx={{ color: "#333", fontWeight: "bolder", fontFamily: "vendana" }}>
            Vision
          </Typography>
          <Typography paragraph sx={{ color: "#555", fontWeight: "bolder", fontFamily: "times" }}>
            To become the go-to stationery store for creativity and innovation, inspiring students, professionals, and artists alike.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#333", fontWeight: "bold", fontFamily: "vendana" }}>
            Mission
          </Typography>
          <Typography paragraph sx={{ color: "#555", fontWeight: "bolder", fontFamily: "times" }}>
            To provide high-quality, eco-friendly, and innovative stationery products that enhance productivity and creativity while supporting a sustainable future.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "16px",
              padding: "5px 20px",
              backgroundColor: "#1A237E",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "vendana",
            backgroundColor: "lightblue",
            color: "red",
          }}
        >
          you're now logged out of scribblespot
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}></DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleCloseLogoutDialog}
            color="primary"
            sx={{
              backgroundColor: "#1A237E",
              color: "#fff",
              "&:hover": { backgroundColor: "green" },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
