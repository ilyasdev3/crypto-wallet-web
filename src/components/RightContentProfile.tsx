import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  MessageSquare,
  TrendingUp,
  Share2,
  Search,
  UserPlus,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { Input } from "./ui/input";

const RightColumnContent = ({ profile, followers, following }: any) => {
  return (
    <Card className="bg-dark-200 shadow-xl">
      <CardContent className="p-6">
        {/* Stats Section with buttons to the left */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-6">
            {/* Posts Stats */}
            <div className="flex items-center gap-2">
              <button className="text-xl font-semibold text-primary-500 hover:bg-dark-300 rounded-md p-2 transition-colors">
                Posts
              </button>
              <span className="text-2xl font-bold text-white">
                {profile.stats.posts}
              </span>
            </div>

            {/* Followers Stats */}
            <div className="flex items-center gap-2">
              <button className="text-xl font-semibold text-primary-500 hover:bg-dark-300 rounded-md p-2 transition-colors">
                Followers
              </button>
              <span className="text-2xl font-bold text-white">
                {profile.stats.followers}
              </span>
            </div>

            {/* Following Stats */}
            <div className="flex items-center gap-2">
              <button className="text-xl font-semibold text-primary-500 hover:bg-dark-300 rounded-md p-2 transition-colors">
                Following
              </button>
              <span className="text-2xl font-bold text-white">
                {profile.stats.following}
              </span>
            </div>
          </div>

          {/* Add more button on the right */}
          <button className="bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600 transition-colors">
            Add More
          </button>
        </div>

        {/* Activity Tab Content */}
        <div className="space-y-6">
          {profile.recentActivity.map((activity: any) => (
            <Card key={activity.id} className="bg-dark-100">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{profile.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-gray-400 text-sm">·</span>
                      <span className="text-gray-400 text-sm">
                        {activity.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{activity.content}</p>
                    <div className="flex items-center gap-6 text-gray-400">
                      <button className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        {activity.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                        <TrendingUp className="w-4 h-4" />
                        {activity.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Followers Tab Content */}
        <div className="space-y-4">
          <Input
            placeholder="Search followers..."
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            className="mb-4"
          />
          <div className="space-y-4">
            {followers.map((user: any) => (
              <Card key={user.id} className="bg-dark-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-400">
                          {user.username}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`p-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
                        user.isFollowing
                          ? "bg-dark-200 text-gray-400 hover:bg-dark-300"
                          : "bg-primary-500 text-white hover:bg-primary-600"
                      }`}
                    >
                      {user.isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Following Tab Content */}
        <div className="space-y-4">
          <Input
            placeholder="Search following..."
            prefix={<Search className="w-4 h-4 text-gray-400" />}
            className="mb-4"
          />
          <div className="space-y-4">
            {following.map((user: any) => (
              <Card key={user.id} className="bg-dark-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-400">
                          {user.username}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg flex items-center gap-2 text-sm bg-dark-200 text-gray-400 hover:bg-dark-300 transition-colors">
                      <UserCheck className="w-4 h-4" />
                      Following
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RightColumnContent;
