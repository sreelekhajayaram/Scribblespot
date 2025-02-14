import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if item data is available
  const item = location.state?.item;
  if (!item) {
    return (
      <div style={styles.container}>
        <h2>No product selected.</h2>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          Go back to Home
        </button>
      </div>
    );
  }

  // State for quantity & total price
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price);

  // Increase quantity & update price
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    setTotalPrice((prevTotal) => prevTotal + item.price);
  };

  // Decrease quantity (min 1) & update price
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      setTotalPrice((prevTotal) => prevTotal - item.price);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>
      <div style={styles.mainContent}>
        {/* Product Details (Left) */}
        <div style={styles.productDetails}>
          <img src={item.image} alt={item.name} style={styles.image} />
          <div style={styles.details}>
            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.description}>{item.description}</p>

            {/* Quantity Selector */}
            <div style={styles.quantityContainer}>
              <button style={styles.quantityButton} onClick={decreaseQuantity}>-</button>
              <span style={styles.quantity}>Quantity: {quantity}</span>
              <button style={styles.quantityButton} onClick={increaseQuantity}>+</button>
            </div>

            {/* Updated Price */}
            <p style={styles.price}>Total Price: <strong>Rs.{totalPrice.toFixed(2)}</strong></p>

            <button style={styles.buyButton} onClick={() => navigate("/payment", { state: { item, quantity, totalPrice } })}>
              Proceed to Buy
            </button>
          </div>
        </div>

        {/* Additional Information (Right) */}
        <div style={styles.infoBox}>
          <p style={styles.infoText}><strong>* Note *</strong></p>
          <p style={styles.infoText}><strong>No refunds or returns</strong></p>
          <p style={styles.infoText}>Delivery within 3-5 business days</p>
          <p style={styles.infoText}>Your package will be safely packed
           and    delivered</p>
          <p style={styles.infoText}>For inquiries, contact <a href="mailto:scribblepsot@gmail.com" style={styles.contactLink}>scribblepsot@gmail.com</a></p>
        </div>
      </div>

      {/* Back to Home Button */}
      <button style={styles.backButton} onClick={() => navigate("/")}>
        Go back to Home
      </button>
    </div>
  );
};

// ✅ Inline Styles
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
    width: "1276px",
    backgroundImage:"url('https://cdn.pixabay.com/photo/2017/08/25/03/14/pencil-2679000_1280.png')",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "600",
    fontFamily: "times",
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    gap: "2px",
  },
  productDetails: {
    flex: 1,
    backgroundColor: "white",
    padding: "4px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
  },
  image: {
    width: "180px",
    height: "180px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "2px solid #ddd",
  },
  details: {
    flex: 1,
    fontWeight: "bolder",
    color:"black",
  },
  name: {
    margin: "0",
    fontSize: "22px",
    color: "#333",
    fontWeight: "bolder",
    fontFamily:"times",
  },
  description: {
    fontSize: "20px",
    color: "green",
    margin: "10px 0",
    fontFamily:"initial",
    fontWeight: "bolder",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "10px 0",
  },
  quantityButton: {
    backgroundColor: "orange",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  quantity: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: "20px",
    fontWeight:"bolder",
    color: "#000",
    marginBottom: "10px",
  },
  buyButton: {
    backgroundColor: "#6a0dad",
    color: "white",
    border: "8px yellow",
    padding: "12px 18px",
    borderRadius: "0px",
    cursor: "pointer",
    fontSize: "18px",
    fontFamily:"vendana",
    transition: "background 0.3s",
  },
  backButton: {
    marginTop: "20px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "arrow",
    fontSize: "16px",
    transition: "background 0.3s",
    fontFamily:"times",
  },
  infoBox: {
    backgroundColor: "white",
    padding: "10px 80px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "left",
  },
  infoText: {
    fontSize: "17px",
    color: "green",
    marginBottom: "10px",
    fontWeight: "bolder",
    fontStretch:"2px",
    fontFamily:"'Roboto', sans-serif",
    textTransform:"uppercase",
   
  },
  contactLink: {
    color: "blue",
    textDecoration: "none",
  },
};

export default Checkout;
