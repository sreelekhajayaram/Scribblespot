import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart");
        setCartItems(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Cart API endpoint not found. Check backend configuration.");
        } else {
          setError("Failed to fetch cart items. Please check your connection.");
        }
      }
    };

    fetchCartItems();
  }, []);

  const increaseQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      if (response.status === 200) {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item._id !== itemId)
        );
        setError({ message: "Item removed successfully!", isSuccess: true });
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError({ message: "Could not remove the item. Please try again.", isSuccess: false });
    }
  };

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle Buy Now functionality for each item
  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { item } }); // Pass selected item to checkout page
  };

  const proceedToBuyAll = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }
  
    alert("Proceeding to buy all items...");
    
    navigate("/checkoutt", { state: { cartItems } }); // Navigate to checkout with all items
  };

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
    totalPrice: {
      fontSize: "18px",
      color: "white",
      fontWeight: "bold",
      marginTop: "8px",
      marginLeft: "64px",
    },
    proceedButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 20px",
      cursor: "pointer",
      borderRadius: "4px",
      marginTop: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      marginLeft: "72px",
    },
    backHomeButton: {
      backgroundColor: "blue",
      color: "white",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    cartItems: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "10px",
      marginTop: "20px",
      color: "black",
      fontFamily: "times",
      fontWeight: "bolder",
    },
    cartItemCard: {
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
    increaseButton: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "4px",
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
    error: {
      color: "red",
      marginTop: "10px",
    },
    emptyCart: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "18px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <button style={styles.backHomeButton} onClick={() => navigate("/")}>
          Back to Home
        </button>
        <h1>Shopping Cart</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={styles.totalPrice}>Total Price: ₹{calculateTotalPrice()}</span>
          <button style={styles.proceedButton} onClick={() => proceedToBuyAll(cartItems)}>Proceed to Buy All</button>
        </div>
      </nav>

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

      {cartItems.length === 0 && !error && (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      )}

      {cartItems.length > 0 && (
        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.cartItemCard}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  Price: ₹<span>{item.price * item.quantity}</span>
                </p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div style={styles.buttonContainer}>
                <button
                  style={styles.increaseButton}
                  onClick={() => increaseQuantity(item)}
                >
                  + Add More
                </button>
                <button
                  style={styles.removeButton}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
                <button
                  style={styles.buyNowButton}
                  onClick={() => handleBuyNow(item)} // Redirect to checkout with item data
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

export default Cart;
