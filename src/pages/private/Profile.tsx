import React, { useState } from "react";
import { Camera, CheckCircle2, Edit2Icon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate if using React Router
import { GET_USER } from "../../graphql/user/queries.user";
import { useQuery } from "@apollo/client";
import { ensureHttps } from "../../utils/imageUrlChecker";

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_USER);

  const navigate = useNavigate(); // React Router navigation

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
          src={ensureHttps(data?.me?.coverImage)}
          alt="Cover"
          className="w-full h-full object-cover"
        />
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
                    src={ensureHttps(data?.me?.profileImage)}
                    alt={data?.me?.profileImage}
                    className="w-24 h-24 rounded-full border-4 border-dark-200"
                  />
                </div>

                {/* Basic Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-white">
                      {data?.me?.firstName} {data?.me?.lastName}
                    </h1>
                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <p className="text-gray-400">{data?.me?.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => navigate(`/edit-profile/${data.me.username}`)} // Navigate to Edit Profile page
                  className="flex items-center px-4 py-2 bg-dark-100 text-white rounded-lg hover:bg-dark-50 transition-colors"
                >
                  <Edit2Icon className="w-5 h-5 mr-2" />
                  Edit
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="bg-dark-100 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-white">About</h2>
                <p className="text-gray-400">{data?.me?.bio}</p>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {/* {Object.entries(profile.stats).map(([key, value]) => (
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
                  ))} */}
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
