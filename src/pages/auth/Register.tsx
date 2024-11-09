import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle file upload
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !profilePicture) {
      setError("All fields are required.");
      return;
    }
    setError(""); // Reset error if no validation errors

    // Simulate the form submission (API call)
    try {
      // Here you can replace the below code with an actual API call to signup the user
      // For example: await api.signup({ name, email, password, profilePicture });

      // After successful signup, redirect to the dashboard or login page
      navigate("/dashboard"); // Redirect to the dashboard page after signup
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <PageTemplate>
      <div className="max-w-lg mx-auto p-8 bg-dark-200 rounded-lg shadow-md">
        <Typography variant="h4" className="text-center mb-6">
          Create an Account
        </Typography>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <Typography variant="body1">{error}</Typography>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-dark-100 text-white rounded-md"
              placeholder="Enter your full name"
              required
            />
          </div>

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

          {/* Profile Picture Field */}
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-white mb-2"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleProfilePictureChange}
              className="w-full p-3 bg-dark-100 text-white rounded-md"
              accept="image/*"
              required
            />
            {/* Display selected image name */}
            {profilePicture && (
              <div className="text-sm text-gray-300 mt-2">
                {profilePicture.name}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-500 text-white p-3 rounded-md hover:bg-primary-600 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default Signup;
