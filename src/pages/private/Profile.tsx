import React, { useState } from "react";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";

// Example recent activities for the user
const exampleActivities = [
  {
    id: "activity1",
    date: "2024-11-01",
    description: "Made a transaction of 0.5 ETH.",
  },
  {
    id: "activity2",
    date: "2024-11-02",
    description: "Updated profile bio.",
  },
  {
    id: "activity3",
    date: "2024-11-03",
    description: "Sent a message to a user.",
  },
];

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "/images/profile-picture.jpg", // Example static image
    bio: "I am a passionate developer and blockchain enthusiast.",
  });

  const [activities, setActivities] = useState(exampleActivities);

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile updates (e.g., API call to update user info)
    // Update user info with new data
    alert("Profile updated!");
  };

  return (
    <PageTemplate>
      <div className="space-y-8">
        {/* Profile Information Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <img
              src={userInfo.profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full mr-6"
            />
            <div>
              <Typography variant="h6" className="mb-2 font-semibold">
                {userInfo.name}
              </Typography>
              <Typography variant="body1" className="text-primary-500">
                {userInfo.email}
              </Typography>
              <Typography variant="body1" className="mt-4">
                {userInfo.bio}
              </Typography>
            </div>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <Typography variant="h6" className="mb-4 font-semibold">
            Edit Profile
          </Typography>
          <form onSubmit={handleEditProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 rounded-md bg-dark-100 text-white"
                defaultValue={userInfo.name}
              />
            </div>
            <div>
              <label htmlFor="bio" className="text-sm text-gray-400">
                Bio
              </label>
              <textarea
                id="bio"
                className="w-full p-2 rounded-md bg-dark-100 text-white"
                defaultValue={userInfo.bio}
              />
            </div>
            <div>
              <label htmlFor="profilePicture" className="text-sm text-gray-400">
                Profile Picture URL
              </label>
              <input
                type="text"
                id="profilePicture"
                className="w-full p-2 rounded-md bg-dark-100 text-white"
                defaultValue={userInfo.profilePicture}
              />
            </div>
            <button
              type="submit"
              className="bg-primary-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-primary-600"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <Typography variant="h6" className="mb-4 font-semibold">
            Recent Activity
          </Typography>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex justify-between">
                <div>
                  <Typography variant="body1" className="font-semibold">
                    {activity.description}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {activity.date}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Profile;
