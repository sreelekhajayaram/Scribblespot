import React, { useEffect, useState } from "react";
import { Container, Card, Typography, Grid, CircularProgress, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const loggedInUserEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!loggedInUserEmail) {
        console.error("No logged-in user email found in localStorage.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/user/${loggedInUserEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          console.error("User not found:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [loggedInUserEmail]);

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: 'url("https://www.bowerham.lancs.sch.uk/wp-content/uploads/2017/07/Bowerham-pencils.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
        position: "relative",
      }}
    >
      {/* Overlay to darken the background for better contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.4)",
        }}
      />

      <Card
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          width: { xs: "90%", sm: "80%", md: "500px" },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: '"Roboto", sans-serif',
            fontWeight: "bold",
            color: "#1A237E",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
            mb: 2,
          }}
        >
          User Profile
        </Typography>

        {user ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A237E" }}>
                Personal Information
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Mobile:</strong> {user.mobile}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1A237E" }}>
                Address
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Address:</strong> {user.address}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>City:</strong> {user.city}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>State:</strong> {user.state}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Country:</strong> {user.country}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Pincode:</strong> {user.pincode}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                <strong>Landmark:</strong> {user.landmark}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">No user data found.</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "block",
            mt: 3,
            width: "100%",
            backgroundColor: "#1A237E",
            "&:hover": {
              backgroundColor: "#303F9F",
            },
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Card>
    </Box>
  );
};

export default UserProfile;
