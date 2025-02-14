import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const BackgroundContainer = styled("div")({
  backgroundImage:
    "url('https://png.pngtree.com/background/20230617/original/pngtree-back-to-school-abstract-background-with-3d-rendered-stationery-supplies-picture-image_3681262.jpg')",
  backgroundSize: "1300px",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  width: "1300px",
});

const FormContainer = styled("div")({
  background: "rgba(255, 255, 255, 0.3)", // Added blur effect
  padding: "40px 30px",
  borderRadius: "12px",
  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)", // Applied blur effect
  maxWidth: "400px",
  width: "100%",
  border: "1px solid rgba(255, 255, 255, 0.2)",
});

const StyledButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#1565C0",
  },
});

const StyledTypography = styled(Typography)({
  fontFamily: "'Times New Roman', serif",
  color: "black",
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "2rem", // Increased font size for header
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

     // Get user data from form fields
  
    try {
      // Check if it's an admin login
      if (email === "admin123@gmail.com" && password === "123egofree") {
        navigate("/admin/dashboard");
        setLoading(false);
        return;
      }

      // If not admin, process user login via API using fetch
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Login successful:", data.message);
        localStorage.setItem("userEmail", email); // Store email in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        // Store full user data
        navigate("/"); // Redirect to user profile
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };
  

  return (
    <BackgroundContainer>
      <FormContainer>
        <StyledTypography variant="h2">Login</StyledTypography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { fontFamily: "'Times New Roman', serif" },
            }}
            inputProps={{
              style: { fontFamily: "'Times New Roman', serif" },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { fontFamily: "'Times New Roman', serif" },
            }}
            inputProps={{
              style: { fontFamily: "'Times New Roman', serif" },
            }}
          />
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </StyledButton>
          </Box>
        </form>
        <Typography
          sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "'Times New Roman', serif",
            color: "black",
          }}
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{ fontFamily: "'Times New Roman', serif", color: "#1565C0" }}
          >
            Click here to register
          </Link>
        </Typography>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </StyledButton>
        </Box>
      </FormContainer>
    </BackgroundContainer>
  );
};

export default Login;
