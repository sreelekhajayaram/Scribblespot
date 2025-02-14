import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.order.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundImage: "url('https://cdn.pixabay.com/photo/2020/06/14/16/31/flyers-5298491_640.jpg')" }}>
     <Typography
  variant="h4"
  gutterBottom
  sx={{
    fontWeight: "bolder",
    color: "white",
    fontSize:"36px",
    textAlign: "center",
    mt: 3,
    textDecoration: "",
  }}
>
  Admin Orders
</Typography>


      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: "12px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FFD700" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>User Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.order_id || "N/A"}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>₹{order.price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>{order.paymentMethod || "Not Provided"}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      sx={{ minWidth: 150 }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Packed">Packed</MenuItem>
                      <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminOrders;
