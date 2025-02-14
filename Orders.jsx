import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const loggedInUserEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders?email=${loggedInUserEmail}`
        );
        const data = await response.json();
        if (data.success && data.orders.length > 0) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (loggedInUserEmail) {
      fetchOrders();
    }
  }, [loggedInUserEmail]);

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/")} style={styles.backButton}>
        ⬅ Back to Home
      </button>
      <h2 style={styles.heading}>Your Orders</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        <ul style={styles.orderList}>
          {orders.map((order, index) => (
            <li key={index} style={styles.orderItem}>
              <img
                src={order.image || "https://via.placeholder.com/100"}
                alt={order.name}
                style={styles.image}
              />
              <div>
                <p><strong>Product:</strong> {order.name}</p>
                <p><strong>Description:</strong> {order.description || "No description"}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total Price:</strong> ₹{order.price}</p>
                <p><strong>Status:</strong> {order.status || "Processing"}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    width: "1300px",
    margin: "0 auto",
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "purple",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "background 0.3s ease",
  },
  heading: {
    fontSize: "28px",
    color: "black",
  },
  noOrders: {
    fontSize: "18px",
    color: "black",
  },
  orderList: {
    listStyle: "none",
    padding: 0,
  },
  orderItem: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    color: "black",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  orderItemHover: {
    transform: "scale(1.02)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    marginRight: "15px",
  },
};

// Add hover effect dynamically
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("li").forEach((li) => {
    li.addEventListener("mouseover", () => {
      Object.assign(li.style, styles.orderItemHover);
    });
    li.addEventListener("mouseout", () => {
      Object.assign(li.style, styles.orderItem);
    });
  });
});

export default OrderDetails;
