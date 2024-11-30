import React, { useState } from "react";
import { Camera, CheckCircle2, Share2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate if using React Router

const ProfilePage = () => {
  const navigate = useNavigate(); // React Router navigation
  const [profile] = useState({
    name: "Sarah Anderson",
    title: "Senior Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coverPhoto:
      "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Passionate software engineer with expertise in full-stack development. Focused on building scalable web applications and contributing to open-source projects.",
    stats: {
      posts: 45,
      followings: 892,
      followers: 1240,
    },
  });

  return (
    <div className="min-h-screen bg-dark-300">
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="absolute z-50 top-4 left-4 flex items-center px-3 py-2 bg-dark-100 text-white rounded-lg hover:bg-dark-50 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Go Back
      </button>
      {/* Cover Photo */}
      <div className="relative h-64">
        <img
          src={profile.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-4 right-4 p-2 rounded-lg bg-dark-50/80 text-white hover:bg-dark-50 transition-colors">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-24">
          <div className="bg-dark-200 rounded-lg shadow-lg p-6">
            {/* Profile Header */}
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-6">
                {/* Avatar */}
                <div className="relative mb-4 sm:mb-0">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full border-4 border-dark-200"
                  />
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary-500 text-white hover:bg-primary-600">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Basic Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-white">
                      {profile.name}
                    </h1>
                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <p className="text-gray-400">{profile.title}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-dark-100 text-white rounded-lg hover:bg-dark-50 transition-colors">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* About */}
                <div className="bg-dark-100 p-6 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4 text-white">
                    About
                  </h2>
                  <p className="text-gray-400">{profile.bio}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(profile.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-dark-100 p-4 rounded-lg text-center"
                    >
                      <div className="text-2xl font-bold text-primary-500">
                        {value}
                      </div>
                      <div className="text-sm text-gray-400 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity Feed */}
                <div className="bg-dark-100 p-6 rounded-lg">
                  <h2 className="text-lg text-white font-semibold mb-4">
                    Recent Posts
                  </h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 pb-4 border-b border-dark-200"
                      >
                        <div className="bg-primary-500/10 p-2 rounded-lg">
                          {/*  */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
