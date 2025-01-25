import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";

interface SuggestedUsersProps {
  topUsers: any[];
  followUser: (userId: string) => void;
  checkIfUserFollows: (userId: string) => boolean;
}

const SuggestedUsers: React.FC<SuggestedUsersProps> = ({
  topUsers,
  followUser,
  checkIfUserFollows,
}) => {
  return (
    <Card className="bg-dark-200 border-none">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Suggested Users
        </h3>
        <div className="space-y-4">
          {topUsers?.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-400">@{user?.username}</p>
                </div>
              </div>
              <button
                onClick={() => followUser(user.id)}
                className="text-primary-500 text-sm hover:text-primary-600"
              >
                {checkIfUserFollows(user.id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedUsers;
