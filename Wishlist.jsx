import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Wishlist items from the server
  const fetchWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/wishlist");
      console.log("Wishlist items:", response.data);
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError({ message: "Failed to fetch wishlist.", isSuccess: false });
    }
  };

  // Run the fetchWishlist function when the component mounts
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove an item from the wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/wishlist/${itemId}`);
      if (response.status === 200) {
        setWishlistItems((prevWishlistItems) =>
          prevWishlistItems.filter((item) => item._id !== itemId)
        );
        setError({ message: "Item removed successfully!", isSuccess: true });
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError({ message: "Could not remove the item. Please try again.", isSuccess: false });
    }
  };

  // Add an item to the cart
  const addToCart = async (item) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart", {
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      });

      if (response.status === 201 || response.status === 200) {
        alert(`${item.name} has been added to the cart!`);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert(`${item.name} already exists in your cart`);
    }
  };

  const addToWishlist = async (item) => {
    try {
      // ✅ Check for duplicates in the frontend state before making a request
      const isItemInWishlist = wishlistItems.some(
        (wishlistItem) => wishlistItem.name === item.name
      );
  
      if (isItemInWishlist) {
        setError({ message: `${item.name} is already in your wishlist!`, isSuccess: false });
        return;
      }
  
      // ✅ Send a request to add item to wishlist (Backend also checks for duplicates)
      const response = await axios.post("http://localhost:5000/api/wishlist", {
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
      });
  
      // ✅ Update state with the new item from the response
      setWishlistItems([...wishlistItems, response.data.data]);
      setError({ message: `${item.name} added to wishlist!`, isSuccess: true });
  
    } catch (error) {
      // ✅ Handle error responses properly
      if (error.response && error.response.status === 400) {
        setError({ message: error.response.data.message, isSuccess: false });
      } else {
        console.error("Error adding item to wishlist:", error);
        setError({ message: "Failed to add item to wishlist.", isSuccess: false });
      }
    }
  };  

  // Handle "Buy Now" button click
  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { item } }); // Navigate to checkout with item details
  };

  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      width: "1303px",
      padding: "20px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "white",
      paddingTop: "120px",
    },
    navbar: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "90%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#1A237E",
      padding: "10px 70px",
      color: "yellow",
      fontFamily: "Times, serif",
      height: "90px",
      zIndex: 0,
    },
    wishlistItems: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "10px",
      marginTop: "20px",
      color: "black",
      fontFamily: "times",
      fontWeight: "bolder",
    },
    wishlistItemCard: {
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      height: "700px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    itemImage: {
      width: "100%",
      height: "350px",
      objectFit: "cover",
      borderRadius: "4px",
    },
    itemDetails: {
      textAlign: "center",
      marginTop: "10px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginTop: "10px",
    },
    removeButton: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    buyNowButton: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    addToCartButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
    emptyWishlist: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "18px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <button style={styles.backHomeButton} onClick={() => navigate("/")}>
          Back to Home
        </button>
        <h1>My Wishlist</h1>
      </nav>

      {/* Error/Success Message */}
      {error && (
        <p
          style={{
            ...styles.error,
            color: error.isSuccess ? "green" : "red",
          }}
        >
          {error.message}
        </p>
      )}

      {/* Empty Wishlist Message */}
      {wishlistItems.length === 0 && !error && (
        <p style={styles.emptyWishlist}>Your wishlist is empty.</p>
      )}

      {/* Wishlist Items */}
      {wishlistItems.length > 0 && (
        <div style={styles.wishlistItems}>
          {wishlistItems.map((item) => (
            <div key={item._id} style={styles.wishlistItemCard}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ₹{item.price}</p>
              </div>
              <div style={styles.buttonContainer}>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove from Wishlist
                </button>
                <button
                  style={styles.addToCartButton}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
                <button
                  style={styles.buyNowButton}
                  onClick={() => handleBuyNow(item)} // ✅ Implement Buy Now
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
