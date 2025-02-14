import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "./OrderContext"; // Custom hook to access order context

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { order } = useOrder(); // Get order details from context

  const [showPopup, setShowPopup] = useState(true);

  return (
    <div style={styles.container}>
      {/* Confirmation Popup */}
      {showPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <div style={styles.iconContainer}>
              <img
                src="https://www.lappymaker.com/images/greentick-unscreen.gif"
                width="300px"
                alt="Celebration"
                style={styles.gif}
              />
            </div>
            <h2 style={styles.popupHeading}>Order Confirmed!</h2>
            <p style={styles.popupMessage}>
              Your order has been successfully placed and payment has been
              processed. 🎉
            </p>
            <div style={styles.buttonContainer}>
              <button
                style={styles.continueButton}
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
              <button
                style={styles.viewOrderButton}
                onClick={() => navigate("/orders")}
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2></h2>
        <p></p>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",
    backgroundImage:
      "url('https://cdn.pixabay.com/photo/2017/08/03/15/14/notebook-2576772_1280.jpg')",
    padding: "20px",
    fontFamily: "times",
    color: "black",
    width: "1274px",
    fontWeight: "bolder",
  },
  popup: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    fontWeight: "bolder",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "80%",
    maxWidth: "600px",
    fontWeight: "bolder",
  },
  iconContainer: {
    marginBottom: "20px",
  },
  gif: {
    width: "200px",
    height: "auto",
  },
  popupHeading: {
    fontSize: "28px",
    fontWeight: "bolder",
    color: "green",
    fontFamily: "'roboto', sans-serif",
  },
  popupMessage: {
    fontSize: "20px",
    color: "black",
    marginBottom: "20px",
    fontWeight: "bolder",
  },
  mainContent: {
    textAlign: "center",
    marginTop: "20px",
    fontWeight: "bolder",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
  },
  viewOrderButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
  continueButton: {
    color: "black",
    padding: "12px 24px",
    border: "none",
    borderRadius: "1px",
    cursor: "pointer",
    fontSize: "12px",
    backgroundColor: "orange",
    "&:hover": {
      backgroundColor: "green", // Change color to green on hover
    },
  },
};

export default OrderConfirmation;
