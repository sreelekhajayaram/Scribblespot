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
} from "@mui/material";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users"); // Ensure correct API
        console.log("Users API Response:", response.data); // Debugging log
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px", minHeight: "100vh", width: "1293px", backgroundImage:"url('https://cdn.pixabay.com/photo/2020/06/14/16/31/flyers-5298491_640.jpg')" }}>
      {loading ? (
        <CircularProgress />
      ) : users.length === 0 ? (
        <Typography>No users found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: "12px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FFD700" }}>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Pincode</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Landmark</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id || user.id}
                  sx={{
                    transition: "0.3s",
                    '&:hover': { backgroundColor: "orange", transform: "scale(1.02)" }
                  }}
                >
                  <TableCell>{user._id || user.id || "N/A"}</TableCell>
                  <TableCell>{user._name || user.name || "N/A"}</TableCell>
                  <TableCell>{user.email || "N/A"}</TableCell>
                  <TableCell>{user.mobile || "N/A"}</TableCell>
                  <TableCell>{user.address || "N/A"}</TableCell>
                  <TableCell>{user.city || "N/A"}</TableCell>
                  <TableCell>{user.state || "N/A"}</TableCell>
                  <TableCell>{user.country || "N/A"}</TableCell>
                  <TableCell>{user.pincode || "N/A"}</TableCell>
                  <TableCell>{user.landmark || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageUsers;
