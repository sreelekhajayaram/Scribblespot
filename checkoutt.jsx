import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkoutt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <h2>No items in the cart.</h2>
        <button style={styles.backButton} onClick={() => navigate("/")}>Go back to Home</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>
      <div style={styles.mainContent}>
        {cartItems.map((item, index) => (
          <div key={index} style={styles.productDetails}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.details}>
              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.description}>{item.description}</p>
              <p style={styles.price}><strong>Rs. {item.price}</strong></p>
            </div>
          </div>
        ))}
      </div>
      <button style={styles.buyButton} onClick={() => navigate("/paymentt", { state: { cartItems } })}>
        Proceed to Buy
      </button>
      <button style={styles.backButton} onClick={() => navigate("/")}>Go back to Home</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
    backgroundColor: "#f8f8f8",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    width:"1300px",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "black",
    fontWeight: "600",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "800px",
    color: "black",
  },
  productDetails: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    gap: "15px",
    color: "black",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "2px solid #ddd",
  },
  details: {
    flex: 1,
    color: "black",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: "14px",
    color: "black",
    margin: "5px 0",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "red",
  },
  buyButton: {
    backgroundColor: "#6a0dad",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
    marginTop: "20px",
  },
  backButton: {
    marginTop: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Checkoutt;
