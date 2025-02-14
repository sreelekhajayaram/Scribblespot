import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
const BackgroundContainer = styled("div")({
  backgroundImage:
    "url('https://img.freepik.com/premium-photo/handful-colored-pencils-holder-table-generative-ai_851708-1898.jpg')",
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
  background: "rgba(255, 255, 255, 0.3)",
  padding: "40px 30px",
  borderRadius: "12px",
  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
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
  fontSize: "2rem",
});

const stateCityMap = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Tirupati",
    "Kurnool",
    "Kadapa",
    "Rajahmundry",
    "Anantapur",
    "Eluru",
    "Srikakulam",
    "Chittoor",
    "Amaravati",
    "Proddatur",
    "Bapatla",
    "Machilipatnam",
    "Rajampet",
    "Palnadu",
    "Narasaraopet",
    "Peddapuram",
    "Jaggayyapet",
    "Kakinada",
    "Chiralapadu",
    "Tadepalligudem"
],

 "Arunachal Pradesh": [
    "Itanagar",
    "Tawang",
    "Ziro",
    "Pasighat",
    "Roing",
    "Bomdila",
    "Tezu",
    "Seppa",
    "Aalo",
    "Rupa",
    "Dirang",
    "Changlang",
    "Namsai",
    "Khonsa",
    "Balijan",
    "Hawai",
    "Lohit",
    "Daporijo",
    "Likabali",
    "Margherita",
    "Sibsagar",
    "Mahadevpur",
    "Yupia",
    "Sagalee"
],
"Assam": [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Jorhat",
    "Tezpur",
    "Tinsukia",
    "Nagaon",
    "Karimganj",
    "Sibsagar",
    "Lakhimpur",
    "Barpeta",
    "Bongaigaon",
    "Haflong",
    "Nalbari",
    "Darrang",
    "Morigaon",
    "Golaghat",
    "Cachar",
    "Sonitpur",
    "Kamrup",
    "Dima Hasao",
    "Kokrajhar",
    "Charaideo",
    "Tinsukia",
    "Udalguri",
    "Jorhat",
    "Bokakhat"
],
"Bihar": [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga",
    "Purnia",
    "Chapra",
    "Arrah",
    "Begusarai",
    "Katihar",
    "Munger",
    "Buxar",
    "Samastipur",
    "Saharsa",
    "Nawada",
    "Kishanganj",
    "Lakhisarai",
    "Vaishali",
    "Siwan",
    "Jamui",
    "Saran",
    "Bihar Sharif",
    "Motihari",
    "Dumraon",
    "Madhepura",
    "Khagaria",
],

 "Chhattisgarh": [
    "Raipur",
    "Bilaspur",
    "Durg",
    "Korba",
    "Rajnandgaon",
    "Jagdalpur",
    "Raigarh",
    "Ambikapur",
    "Mahasamund",
    "Kawardha",
    "Bemetara",
    "Janjgir",
    "Dhamtari",
    "Pendra",
    "Kanker",
    "Balod",
    "Baloda Bazar",
    "Bijapur",
    "Mungeli",
    "Sarangarh",
    "Rajnandgaon",
    "Dongargarh",
    "Naya Raipur",
    "Champa",
],
  "Goa": [
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa",
    "Ponda",
    "Cortalim",
    "Bicholim",
    "Quepem",
    "Sanguem",
    "Canacona",
    "Sawaswada",
    "Pernem",
    "Valpoi"
],
  "Gujarat": [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Gandhinagar",
    "Anand",
    "Morbi",
    "Navsari",
    "Bharuch",
    "Mehsana",
    "Kheda",
    "Patan",
    "Sabarkantha",
    "Narmada",
    "Porbandar",
    "Valsad",
    "Dahod",
    "Banaskantha",
    "Surendranagar",
    "Tapi",
    "Aravalli",
    "Chhota Udepur",
    "Kachchh",
    "Mahisagar",
    "Botad",
    "Dang"
  ],
    "Haryana": [
      "Chandigarh",
      "Faridabad",
      "Gurugram",
      "Ambala",
      "Karnal",
      "Panipat",
      "Hisar",
      "Yamunanagar",
      "Rohtak",
      "Bhiwani",
      "Jind",
      "Sonipat",
      "Kaithal",
      "Rewari",
      "Mahendragarh",
      "Palwal",
      "Fatehabad",
      "Sirsa",
      "Nuh",
      "Bhiwani",
      "Charkhi Dadri",
    ],
      "Himachal Pradesh": [
        "Shimla",
        "Manali",
        "Dharamshala",
        "Kullu",
        "Solan",
        "Mandi",
        "Chamba",
        "Hamirpur",
        "Bilaspur",
        "Kangra",
        "Una",
        "Kullu",
        "Sirmaur",
        "Lahaul and Spiti",
        "Chamba",
        "Solan"
      ],
        "Jharkhand": [
          "Ranchi",
          "Jamshedpur",
          "Dhanbad",
          "Bokaro",
          "Hazaribagh",
          "Deoghar",
          "Giridih",
          "Ramgarh",
          "Chaibasa",
          "Palamu",
          "Dumka",
          "Godda",
          "Latehar",
          "Pakur",
          "Koderma",
          "Jamtara",
          "Sahebganj",
          "Simdega",
          "Khunti",
          "Garhwa",
          "Giridih",
          "Chatra",
          "Hazaribagh",
        ],
        "Karnataka": [
          "Bengaluru",
          "Mysuru",
          "Hubli",
          "Mangalore",
          "Belgaum",
          "Dharwad",
          "Bijapur",
          "Tumkur",
          "Shimoga",
          "Davangere",
          "Udupi",
          "Chitradurga",
          "Chikkamagaluru",
          "Bagalkot",
          "Kodagu",
          "Hassan",
          "Mandya",
          "Kolar",
          "Chamarajanagar",
          "Dakshina Kannada",
          "Gadag",
          "Bellary",
          "Raichur",
          "Bidar",
          "Yadgir",
          "Koppal",
          "Chikkaballapur",
          "Ramanagara",
          "North Goa",
          "South Goa",
          "Bengaluru Rural",
          "Haveri",
          "Kalaburagi"
        ],      
    Kerala: [
      "Thiruvananthapuram",
      "Kollam",
      "Pathanamthitta",
      "Alappuzha",
      "Kottayam",
      "Idukki",
      "Ernakulam",
      "Thrissur",
      "Palakkad",
      "Malappuram",
      "Kozhikode",
      "Wayanad",
      "Kannur",
      "Kasaragod",
    ],
  
  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Sagar",
    "Rewa",
    "Satna",
    "Ratlam",
    "Chhindwara",
    "Mandsaur",
    "Sehore",
    "Chhatarpur",
    "Vidisha",
    "Shivpuri",
    "Khargone",
    "Tikamgarh",
    "Narsinghpur",
    "Balaghat",
    "Hoshangabad",
    "Dewas",
    "Damoh",
    "Betul",
    "Khandwa",
    "Mandla",
    "Shahdol",
    "Rajgarh",
    "Panna",
    "Ashoknagar",
    "Datia",
    "Rewa",
    "Alirajpur",
    "Neemuch"
],
"Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Thane",
    "Solapur",
    "Amravati",
    "Kolhapur",
    "Sangli",
    "Palghar",
    "Ratnagiri",
    "Raigad",
    "Sindhudurg",
    "Bhandara",
    "Chandrapur",
    "Hingoli",
    "Jalna",
    "Akola",
    "Washim",
    "Wardha",
    "Latur",
    "Beed",
    "Osmanabad",
    "Nanded",
    "Satara",
    "Yavatmal",
    "Nagpur",
    "Buldhana",
    "Gadchiroli",
    "Parbhani",
    "Nandurbar"
],
"Manipur": [
    "Imphal",
    "Thoubal",
    "Bishnupur",
    "Churachandpur",
    "Ukhrul",
    "Senapati",
    "Tamenglong",
    "Kakching",
    "Chandel",
    "Tengnoupal",
    "Kamjong",
    "Noney",
    "Pherzawl"
],
"Meghalaya": [
    "Shillong",
    "Tura",
    "Nongpoh",
    "Cherrapunji",
    "Jowai",
    "Baghmara",
    "Mairang",
    "Williamnagar",
    "Mawkyrwat",
    "Ampati",
    "Nongstoin",
    "Khliehriat",
    "Resubelpara",
    "Berlapara",
    "Laitkroh"
],
"Mizoram": [
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Serchhip",
    "Kolasib",
    "Saiha",
    "Mamit",
    "Lawngtlai",
    "Hnahthial",
    "Saitual",
    "Lunglei",
    "Khawzawl",
    "Aizawl",
    "Champhai",
    "Siaha"
],
"Nagaland": [
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "Mon",
    "Phek"
],
"Odisha": [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri",
    "Sambalpur",
    "Berhampur",
    "Balasore",
    "Baripada",
    "Bhadrak",
    "Jagatsinghpur",
    "Kendrapara",
    "Khurda",
    "Nayagarh",
    "Jajpur",
    "Dhenkanal",
    "Angul",
    "Kalahandi",
    "Rayagada",
    "Koraput",
    "Malkangiri",
    "Boudh",
    "Subarnapur",
    "Ganjam",
    "Gajapati",
    "Nabarangpur",
    "Sundargarh",
    "Mayurbhanj"
],
"Punjab": [
    "Chandigarh",
    "Amritsar",
    "Ludhiana",
    "Patiala",
    "Jalandhar",
    "Bathinda",
    "Mohali",
    "Pathankot",
    "Hoshiarpur",
    "Firozpur",
    "Sangrur",
    "Kapurthala",
    "Moga",
    "Faridkot",
    "Rupnagar",
    "Barnala",
    "Fatehgarh Sahib",
    "Sri Muktsar Sahib",
    "Tarn Taran"
],
"Rajasthan": [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Kota",
    "Bikaner",
    "Alwar",
    "Bharatpur",
    "Sikar",
    "Churu",
    "Pali",
    "Nagaur",
    "Jhunjhunu",
    "Barmer",
    "Dungarpur",
    "Rajsamand",
    "Bundi",
    "Jaisalmer",
    "Jalore",
    "Sirohi",
    "Tonk",
    "Chittorgarh",
    "Rajasthan",
    "Banswara",
    "Pratapgarh",
    "Udaipur",
    "Karauli"
],
"Sikkim": [
    "Gangtok",
    "Namchi",
    "Pelling",
    "Ravangla",
    "Mangan",
    "Geyzing"
],
 TamilNadu: [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
    "Erode",
    "Tirunelveli",
    "Thoothukudi",
    "Vellore",
    "Dindigul",
    "Ramanathapuram",
    "Thanjavur",
    "Karur",
    "Tiruppur",
    "Kanchipuram",
    "Tiruvallur",
    "Villupuram",
    "Cuddalore",
    "Pudukkottai",
    "Krishnagiri",
    "Nagapattinam",
    "Ariyalur",
    "Perambalur",
    "Theni",
    "Nilgiris",
    "Kanyakumari",
    "Virudhunagar",
    "Sivaganga"
],

  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
    "Mahbubnagar",
    "Adilabad",
    "Siddipet",
    "Rangareddy",
    "Medak",
    "Jagtial",
    "Suryapet",
    "Nirmal",
    "Peddapalli",
    "Jangaon",
    "Kamareddy",
    "Nagarkurnool",
    "Mahabubabad",
    "Vikarabad",
    "Jayashankar Bhupalapally"
],

  Tripura: [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Kailashahar",
    "Ambassa",
    "Belonia",
    "Sonamura",
    "Khowai",
    "Melaghar",
    "Ranirbazar",
    "Sabroom",
    "Tirthamukh"
],

  UttarPradesh: [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Azamgarh",
    "Barabanki",
    "Basti",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddh Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kaushambi",
    "Kushinagar",
    "Lakhimpur Kheri",
    "Lalitpur",
    "Lucknow",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shrawasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
],

  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Rishikesh",
    "Almora",
    "Haldwani",
    "Rudrapur",
    "Pithoragarh",
    "Champawat",
    "Tehri Garhwal",
    "Uttarkashi",
    "Bageshwar",
    "Rudraprayag",
    "Nainital",
    "Pauri Garhwal",
    "Haridwar",
    "Udham Singh Nagar",
    "Kumaon",
    "Garhwal"
],
  "West Bengal": [
    "Kolkata",
    "Darjeeling",
    "Asansol",
    "Siliguri",
    "Durgapur",
    "Howrah",
    "Malda",
    "Bardhaman",
    "Rajshahi",
    "Kolar",
    "Kalyani",
    "Ranaghat",
    "Jalpaiguri",
    "Balurghat",
    "Krishnanagar",
    "Midnapore",
    "Bankura",
    "Cooch Behar",
    "Shibpur",
    "Bongaon",
    "Haldia",
    "Bishnupur",
    "Tamluk",
    "Srirampur"
],
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    landmark: "",
    pincode: "",
    state: "",
    country: "India",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false); // Modal visibility state

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input restrictions
    if (name === "pincode" && value.length > 6) return; // Pincode max length 6
    if (name === "mobile" && value.length > 10) return; // Mobile max length 10
    if ((name === "address" || name === "landmark") && /\d/.test(value)) return; // Address and landmark cannot have digits
    if (name === "password" && value.length > 50) return; // Password max length 50

    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    const { email, password, confirmPassword, pincode, mobile, state, city } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number

    if (!emailRegex.test(email)) return "Invalid email format.";
    if (!passwordRegex.test(password))
      return "Password must be at least 8 characters long and include both letters and numbers.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!/^\d{6}$/.test(pincode)) return "Pincode must be exactly 6 digits.";
    if (!/^\d{10}$/.test(mobile)) return "Mobile number must be exactly 10 digits.";
    if (!state) return "Please select a state.";
    if (!city) return "Please select a city.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Reset success message


    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);

      if (response.data.success) {
        setSuccessMessage(`Registration successful! Welcome, ${formData.name}.`);
        setOpenSuccessDialog(true); // Show the success dialog
        localStorage.setItem('user', JSON.stringify(userData)); // Make sure the user data is saved correctly
      } else {
        setError(response.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleCloseDialog = () => {
    setOpenSuccessDialog(false); // Close the success dialog
    navigate("/login"); // Redirect to the login page after closing
  };


  return (
    <BackgroundContainer>
      <FormContainer>
        <StyledTypography variant="h2">Register</StyledTypography>
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
         <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            type="password"
          />
          <TextField
            label="Mobile Number"
            name="mobile"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.mobile}
            onChange={handleChange}
            required
            type="number"
          />
          <TextField
            label="State"
            name="state"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.state}
            onChange={handleChange}
            required
            select
          >
            {Object.keys(stateCityMap).map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="City"
            name="city"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.city}
            onChange={handleChange}
            required
            select
          >
            {(stateCityMap[formData.state] || []).map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Address"
            name="address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            label="Pincode"
            name="pincode"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.pincode}
            onChange={handleChange}
            required
            type="number"
          />
          <TextField
            label="Landmark (Optional)"
            name="landmark"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.landmark}
            onChange={handleChange}
          />
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </StyledButton>
          </Box>
        </form>
        <Typography sx={{ mt: 2, textAlign: "center", color: "black" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1565C0" }}>
            Click here to login
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
      {/* Success Dialog */}
      <Dialog 
  open={openSuccessDialog} 
  onClose={handleCloseDialog} 
  sx={{
    "& .MuiPaper-root": {
      borderRadius: "12px",
      background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
      padding: "20px",
      boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
    }
  }}
>
  <DialogTitle 
    sx={{
      fontSize: "22px",
      fontWeight: "bold",
      color: "#1565C0",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
      paddingBottom: "10px"
    }}
  >
   Registration Successful!
  </DialogTitle>

  <DialogContent 
    sx={{
      textAlign: "center",
      fontSize: "18px",
      color: "#444",
      fontFamily: "'Roboto', sans-serif",
    }}
  >
    <Typography 
      variant="body1" 
      sx={{
        fontSize: "16px",
        fontWeight: "500",
        color: "#333",
        lineHeight: "1.5",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {successMessage}
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", paddingBottom: "10px" }}>
    <Button 
      onClick={handleCloseDialog} 
      sx={{
        backgroundColor: "#1565C0",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "8px 20px",
        borderRadius: "8px",
        transition: "0.3s",
        fontFamily: "'Poppins', sans-serif",
        "&:hover": {
          backgroundColor: "#0d47a1",
          transform: "scale(1.05)",
        }
      }}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>
    </BackgroundContainer>
  );
};

export default Register;
