import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOrder } from "./OrderContext"; // Import custom hook

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addOrder } = useOrder(); // Get the setOrder function from context
  const item = location.state?.item;
  const quantity = location.state?.quantity || 1;
  const totalPrice = location.state?.totalPrice || (item?.price || 0);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateCardNumber = (number) => /^\d{16}$/.test(number);
  const validateExpiry = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/; // Matches MM/YY format
    const match = date.match(regex);
    if (!match) return false;
  
    const enteredMonth = parseInt(match[1], 10);
    const enteredYear = parseInt(match[2], 10);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
  
    // Check if the entered year is before the current year
    if (enteredYear < currentYear) return false;
  
    // Check if the entered month is before the current month in the same year
    if (enteredYear === currentYear && enteredMonth < currentMonth) return false;
  
    return true;
  };
  

  const validateCVV = (cvv) => /^\d{3}$/.test(cvv);
  const validateName = (name) => name.trim().length > 2;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      setError("Invalid Name. Please enter a valid name.");
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setError("Invalid Card Number. Must be 16 digits.");
      return;
    }
    if (!validateExpiry(expiry)) {
      setError("Invalid Expiry Date. Use MM/YY format.");
      return;
    }
    if (!validateCVV(cvv)) {
      setError("Invalid CVV. Must be 3 digits.");
      return;
    }
   
    const orderData = {
      name: item.name,
      description: item.description || "",
      price: totalPrice,
      image: item.image,
      quantity,
      userEmail: localStorage.getItem("userEmail"),
      paymentMethod: "Credit/Debit Card",
      status: "Paid",
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Payment Successful! Order placed.");
        addOrder(orderData);
        navigate("/order-confirmation");
      } else {
        alert("Order placement failed: " + data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };
  
  if (!item) {
    navigate("/checkout");
    return null;
  }

  return (
    <div style={styles.background}>
      <div style={styles.blurContainer}>
        <h2 style={styles.heading}>Secure Payment</h2>
        <div style={styles.card}>
          <img src={item.image} alt={item.name} style={styles.image} />
          <div style={styles.details}>
            <h3 style={styles.productTitle}>{item.name}</h3>
            <p style={styles.text}>Quantity: {quantity}</p>
            <p style={styles.text}>
              Total Price: <strong>Rs. {totalPrice.toFixed(2)}</strong>
            </p>
          </div>
        </div>
        <form onSubmit={handlePayment} style={styles.form}>
          <input
            type="text"
            placeholder="Cardholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Card Number (16 digits)"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            maxLength="5"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="CVV (3 digits)"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.payButton}>
            Pay ₹{totalPrice.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage:
      "url('https://cdn.pixabay.com/photo/2021/03/16/11/31/pencils-6099511_1280.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  blurContainer: {
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "400px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "orange",
    textShadow: "3px 3px 0 green, 6px 6px 0 rgba(0, 128, 0, 0.5)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    fontFamily: "Arial, sans-serif",
    padding: "10px",
  },
  card: {
    display: "flex",
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    color: "black",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  details: {
    paddingLeft: "10px",
    color: "black",
  },
  text: {
    fontSize: "14px",
    color: "black",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "black",
  },
  error: {
    color: "red",
  },
  payButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Payment;
