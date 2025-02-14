import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh",width:"1355px", color:"white", backgroundImage: "url('https://cdn.pixabay.com/photo/2020/06/14/16/31/flyers-5298491_640.jpg')" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#1A237E",
            backdropFilter: "blur(10px)",
            boxShadow: "5px 0 10px rgba(0,0,0,0.1)",
            color:"white",
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Admin Dashboard
        </Box>
        <List>

         {/* Other menu items */}
      <ListItem
        button
        onClick={() => navigate("/admin/orders")}
        sx={{
          transition: "0.3s",
          "&:hover": { backgroundColor: "#1E88E5", color: "white" },
        }}
      >
        <ListItemIcon>
          <ShoppingCartIcon sx={{ color: "black" }} />
        </ListItemIcon>
        <ListItemText primary="Manage Orders" />
      </ListItem>

          {/* Manage Users */}
          <ListItem
            button
            onClick={() => navigate("/admin/users")}
            sx={{
              transition: "0.3s",
              "&:hover": { backgroundColor: "#1E88E5", color: "white" },
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/admin/manage-menu")}
            sx={{
              transition: "0.3s",
              "&:hover": { backgroundColor: "#1E88E5", color: "white" },
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Manage menu" />
          </ListItem>

          <ListItem
            button
            onClick={() => navigate("/admin/reviews")}
            sx={{
              transition: "0.3s",
              "&:hover": { backgroundColor: "#1E88E5", color: "white" },
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Manage reviews" />
          </ListItem>

          {/* Logout */}
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              transition: "0.3s",
              "&:hover": { backgroundColor: "#d32f2f", color: "white" },
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#1A237E",
            boxShadow: "none",
            borderBottom: "3px solid #1E88E5",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold", color:"white" }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Stats Cards */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Orders Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#1E88E5",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Orders</Typography>
                <Typography variant="h3" fontWeight="bold">
                  120
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Users Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#43A047",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Users</Typography>
                <Typography variant="h3" fontWeight="bold">
                  500
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#FF9800",
                color: "white",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h5">Revenue</Typography>
                <Typography variant="h3" fontWeight="bold">
                  Rs.50K
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
