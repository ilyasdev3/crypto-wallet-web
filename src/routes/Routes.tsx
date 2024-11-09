// src/routes/Routes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/public/Home";
import FeaturesPage from "../pages/public/Features";
import ContactPage from "../pages/public/Contact";
import WalletPage from "../pages/public/Wallet";
import ProfilePage from "../pages/private/Profile";
import NewsfeedPage from "../pages/private/Newsfeed";
import Signup from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import CryptoListPage from "../pages/public/CryptoList";
import CryptoDetail from "../pages/public/CryptoDetail";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/newsfeed" element={<NewsfeedPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crypto-list" element={<CryptoListPage />} />
      <Route path="/crypto/:name" element={<CryptoDetail />} />

      {/* Auth Routes */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}

      {/* {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </>
      ) : (
        // Redirect unauthenticated users to the login page
        <Route path="/dashboard" element={<Navigate to="/login" />} />
      )} */}

      {/* Optional: Fallback route for 404 */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default RoutesComponent;
