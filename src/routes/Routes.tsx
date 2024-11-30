// src/routes/Routes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import LandingPage from "../pages/public/Home";
import FeaturesPage from "../pages/public/Features";
import ContactPage from "../pages/public/Contact";
import WalletPage from "../pages/private/Wallet";
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
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/crypto-list" element={<CryptoListPage />} />
      <Route path="/crypto/:name" element={<CryptoDetail />} />

      {/* Protected Routes */}
      <Route
        path="/wallet"
        element={
          <AuthGuard>
            <WalletPage />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path="/newsfeed"
        element={
          <AuthGuard>
            <NewsfeedPage />
          </AuthGuard>
        }
      />

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default RoutesComponent;
