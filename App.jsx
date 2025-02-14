import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '/Home'
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart"; // Adjust the path based on where Cart.jsx is located
import AdminDashboard from "./components/AdminDashboard";
import Wishlist from "./components/Wishlist";
import ManageUsers from "./components/ManageUsers"; 
import Checkout from "./components/checkout";
import Checkoutt from "./components/checkoutt";
import Payment from "./components/payment";
import Paymentt from "./components/paymentt";
import OrderConfirmation from "./components/OrderConfirmation";
import { OrderProvider } from "./components/OrderContext"; 
import Orders from "./components/Orders";
import UserProfile from "./components/UserProfile";
import AdminOrders from "./components/AdminOrders";
import AdminManageMenu from "./components/AdminManageMenu"; 
import AdminReviews from "./components/AdminReviews";
const App = () => {
  return (
    <Router>
      <OrderProvider>
      <Routes>
        {/* Display HomePage as the first page */}
        <Route path="/" element={<Home />} />
        {/* Other routes */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkoutt" element={<Checkoutt/>}/>{/* Checkout page */} {/* Make sure this is wrapping the part of your app where Payment is used */}
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/paymentt" element={<Paymentt />} /> {/* Payment processing */}
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/manage-menu" element={<AdminManageMenu />} /> 
        <Route path="/admin/reviews" element={<AdminReviews />} />
      </Routes>
      </OrderProvider>
    </Router>
  );
};

export default App;
