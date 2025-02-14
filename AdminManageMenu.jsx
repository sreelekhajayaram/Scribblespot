import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const API_BASE_URL = "http://localhost:5000/api/products"; // Adjust if needed

const AdminManageMenu = () => {
  // State for the form fields
  const [product, setProduct] = useState({ name: "", description: "", price: "", image: "" });
  // State for the list of products fetched from the backend
  const [products, setProducts] = useState([]);
  // Track if we're editing an existing product or adding a new one
  const [isEditing, setIsEditing] = useState(false);
  // Store the id of the product currently being edited
  const [editingId, setEditingId] = useState(null);
  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setSnackbar({ open: true, message: "Failed to fetch products!", severity: "error" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submit for adding or updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update the existing product
      try {
        await axios.put(`${API_BASE_URL}/${editingId}`, product, {
          headers: { "Content-Type": "application/json" },
        });
        setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
        setProduct({ name: "", description: "", price: "", image: "" });
        setIsEditing(false);
        setEditingId(null);
        fetchProducts();
      } catch (error) {
        console.error("Error updating product:", error);
        setSnackbar({ open: true, message: "Failed to update product!", severity: "error" });
      }
    } else {
      // Add a new product
      try {
        await axios.post(API_BASE_URL, product, {
          headers: { "Content-Type": "application/json" },
        });
        setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
        setProduct({ name: "", description: "", price: "", image: "" });
        fetchProducts();
      } catch (error) {
        console.error("Error adding product:", error);
        setSnackbar({ open: true, message: "Failed to add product!", severity: "error" });
      }
    }
  };

  // Populate the form with the product's data for editing
  const handleEdit = (prod) => {
    setProduct({ name: prod.name, description: prod.description, price: prod.price, image: prod.image });
    setIsEditing(true);
    setEditingId(prod._id || prod.id);
  };

  // Delete a product from the backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setSnackbar({ open: true, message: "Product deleted successfully!", severity: "success" });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setSnackbar({ open: true, message: "Failed to delete product!", severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        width: "1300px",
        minHeight: "100vh",
        padding: "40px 20px",
        backgroundImage:"url('https://cdn.pixabay.com/photo/2020/06/14/16/31/flyers-5298491_640.jpg')", // Background color for full page
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px",
          background: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: 3, fontWeight: "bold", color: "#333" }}
        >
          Admin Manage Menu
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}
          noValidate
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            sx={{ backgroundColor: "#fff" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#1A237E",
              "&:hover": { backgroundColor: "#0d1240" },
            }}
          >
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
          {isEditing && (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                setIsEditing(false);
                setProduct({ name: "", description: "", price: "", image: "" });
                setEditingId(null);
              }}
              sx={{ textTransform: "none" }}
            >
              Cancel Edit
            </Button>
          )}
        </Box>

        <Typography
          variant="h5"
          sx={{ marginBottom: 2, fontWeight: "bold", color: "#333" }}
        >
          Existing Products
        </Typography>
        <Grid container spacing={2}>
          {products.map((prod) => (
            <Grid item xs={12} md={6} key={prod._id || prod.id}>
              <Paper
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {prod.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {prod.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  ₹{prod.price}
                </Typography>
                {prod.image && (
                  <Box
                    component="img"
                    src={prod.image}
                    alt={prod.name}
                    sx={{ width: "100%", height: "auto", borderRadius: "4px" }}
                  />
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(prod)}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(prod._id || prod.id)}
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AdminManageMenu;
