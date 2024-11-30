import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/user/mutation.user";
import { showToast } from "../../utils/toastConfig";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [createUser, { loading: isSubmitting }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      if (data.createUser.token) {
        localStorage.setItem("walletToken", data.createUser.token);
      }
      showToast.success("Account created successfully");
      setTimeout(() => {
        navigate("/wallet");
      }, 3000);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      showToast.error(error.message);
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      showToast.error("Please select a valid image file");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast.error("File size must be less than 5MB");
      return false;
    }

    return true;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data:image/[type];base64, prefix
        const base64Data = base64String.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) {
      e.target.value = "";
      setProfilePicture(null);
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setProfilePicture(file);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const validateForm = (): boolean => {
    if (!Object.values(formData).every(Boolean)) {
      showToast.error("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      showToast.error("Password must be at least 8 characters long");
      return false;
    }

    if (!profilePicture) {
      showToast.error("Please select a profile picture");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !profilePicture) return;

    try {
      // Convert image to base64
      const base64Image = await convertFileToBase64(profilePicture);

      // Create variables object for mutation
      const variables = {
        user: {
          ...formData,
          profileImage: base64Image, // Send base64 string directly
        },
      };

      // Execute the mutation
      await createUser({
        variables,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during signup";
      showToast.error(errorMessage);
      console.error("Signup error:", err);
    }
  };

  return (
    <PageTemplate>
      <div className="max-w-lg mx-auto p-8 bg-dark-200 rounded-lg shadow-md">
        <Typography variant="h4" className="text-center mb-6">
          Create an Account
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="John"
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Doe"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="john.doe@example.com"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="johndoe"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="••••••••"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Profile Picture Field */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                id="profilePicture"
                onChange={handleProfilePictureChange}
                className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                accept="image/*"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </PageTemplate>
  );
};

export default Signup;
