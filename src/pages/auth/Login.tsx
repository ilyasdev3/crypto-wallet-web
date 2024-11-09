import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../components/_layout";
import Navbar from "../../components/Navbar"; // Assuming you have a Navbar component
import Typography from "../../components/ui/Typography";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    setError(""); // Reset error if no validation errors

    // Simulate the form submission (API call)
    try {
      // Here you can replace the below code with an actual API call to login the user
      // For example: await api.login({ email, password });

      // After successful login, redirect to the dashboard or homepage
      navigate("/dashboard"); // Redirect to the dashboard page after login
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <PageTemplate>
      <div className="max-w-lg mx-auto p-8 bg-dark-200 rounded-lg shadow-md mt-12">
        <Typography variant="h4" className="text-center mb-6">
          Log In to Your Account
        </Typography>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <Typography variant="body1">{error}</Typography>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-dark-100 text-white rounded-md"
              placeholder="Enter your email"
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
