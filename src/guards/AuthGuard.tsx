// src/guards/AuthGuard.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/user/queries.user";
import { useState, useEffect } from "react";
import { showToast } from "../utils/toastConfig";

interface AuthGuardProps {
  children: React.ReactNode;
}

interface User {
  me: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const token = localStorage.getItem("walletToken");

  const { loading, error, data } = useQuery<User>(GET_USER, {
    skip: !token,
    fetchPolicy: "network-only",
    onError: (error) => {
      console.error("Error verifying user:", error);
      localStorage.removeItem("walletToken");
      showToast.error("Authentication failed. Please login again.");
    },
  });

  useEffect(() => {
    if (!loading) {
      setIsVerifying(false);
    }
  }, [loading]);

  // Add debug logging
  useEffect(() => {
    console.log("Auth State:", {
      token,
      loading,
      error,
      data,
      isVerifying,
    });
  }, [token, loading, error, data, isVerifying]);

  if (isVerifying || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!token || error || !data?.me) {
    localStorage.removeItem("walletToken");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
