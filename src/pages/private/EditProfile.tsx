import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../graphql/user/mutation.user";
import { GET_USER } from "../../graphql/user/queries.user";
import { showToast } from "../../utils/toastConfig";
import Spinner from "../../components/ui/Spinner";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get the user ID from the URL
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    avatar: null,
    coverPhoto: null,
    bio: "",
    email: "",
  });

  const [previewUrls, setPreviewUrls] = useState({
    avatar: null,
    coverPhoto: null,
  });
  const [loadingSave, setLoadingSave] = useState(false); // Loading state for saving

  // Fetch the user data by ID using useQuery
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId }, // Ensure you pass the userId to the query
  });

  useEffect(() => {
    if (data) {
      setProfile({
        firstName: data.me.firstName,
        lastName: data.me.lastName,
        avatar: null,
        coverPhoto: null,
        bio: data.me.bio,
        email: data.me.email,
      });
      setPreviewUrls({
        avatar: data.me.avatar,
        coverPhoto: data.me.coverPhoto,
      });
    }
  }, [data]);

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      showToast.success("Profile updated successfully");
      setLoadingSave(false); // Stop loading after update
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      showToast.error(error.message);
      setLoadingSave(false); // Stop loading on error
    },
  });

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
        const base64Data = base64String.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (!file || !validateFile(file)) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({
      ...prev,
      [name]: objectUrl,
    }));

    setProfile((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingSave(true); // Set loading to true when starting the save process

    try {
      const avatarBase64 = profile.avatar
        ? await convertFileToBase64(profile.avatar)
        : undefined;
      const coverPhotoBase64 = profile.coverPhoto
        ? await convertFileToBase64(profile.coverPhoto)
        : undefined;

      const variables: any = {
        user: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio,
          email: profile.email,
          ...(avatarBase64 && { profileImage: avatarBase64 }),
          ...(coverPhotoBase64 && { coverImage: coverPhotoBase64 }),
        },
      };

      await updateUser({ variables });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while updating the profile.";
      showToast.error(errorMessage);
      console.error("Profile update error:", err);
      setLoadingSave(false); // Stop loading on error
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-dark-300 pt-3">
      <button
        onClick={() => navigate(-1)}
        className="absolute z-50 top-4 left-4 flex items-center px-3 py-2 bg-dark-100 text-white rounded-lg hover:bg-dark-50 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Go Back
      </button>

      <div className="max-w-3xl mx-auto mt-16 p-6 bg-dark-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>

        {/* First Name */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-dark-100 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Last Name */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-dark-100 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* email */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            // disabled
            className="w-full p-3 rounded-lg bg-dark-100 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-dark-100 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          ></textarea>
        </div>

        {/* Cover Photo Upload */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Cover Photo</label>
          {previewUrls.coverPhoto ? (
            <img
              src={previewUrls.coverPhoto}
              alt="Cover Preview"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
          ) : (
            <p className="text-gray-500 mb-4">No cover photo selected</p>
          )}
          <input
            type="file"
            name="coverPhoto"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg bg-dark-100 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="text-gray-400 mb-2 block">Profile Picture</label>
          {previewUrls.avatar ? (
            <img
              src={previewUrls.avatar}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-dark-100 mb-4"
            />
          ) : (
            <p className="text-gray-500 mb-4">No profile picture selected</p>
          )}
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg bg-dark-100 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loadingSave}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-400"
          >
            {loadingSave ? <Spinner height="h-full" /> : "Save"}{" "}
            {/* Show spinner if loading */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
