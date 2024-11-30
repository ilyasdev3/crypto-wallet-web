import React, { useState } from "react";
import PageTemplate from "../../components/_layout";
import Navbar from "../../components/Navbar"; // Assuming you have a Navbar component
import Typography from "../../components/ui/Typography";
import { LOGIN_USER } from "../../graphql/user/mutation.user";
import { useMutation } from "@apollo/client";
import { showToast } from "../../utils/toastConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { resetApolloClient } from "../../graphqlClient";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const from = (location.state as any)?.from || "/wallet";

  const [loginUser, { loading: isSubmitting }] = useMutation(LOGIN_USER, {
    onCompleted: async (data) => {
      if (data.loginUser.token) {
        // Store token
        localStorage.setItem("walletToken", data.loginUser.token);

        // Reset Apollo Client with new token
        resetApolloClient();

        showToast.success("Login successful");
        navigate(from, { replace: true });
      }
    },
    onError: (error) => {
      console.error("Error logging in:", error);
      showToast.error(error.message);
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showToast.error("Both email and password are required.");
      return;
    }
    try {
      const variables = {
        user: {
          username,
          password,
        },
      };

      await loginUser({
        variables,
      });

      navigate("/wallet");
    } catch (error) {
      showToast.error(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <PageTemplate>
      <div className="max-w-lg mx-auto p-8 bg-dark-200 rounded-lg shadow-md mt-12">
        <Typography variant="h4" className="text-center mb-6">
          Log In to Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* username Field */}
          <div className="mb-4"></div>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-dark-100 text-white rounded-md"
              placeholder="Enter your username"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-dark-100 text-white rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-500 text-white p-3 rounded-md hover:bg-primary-600 transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-primary-500 hover:text-primary-600"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Login;
