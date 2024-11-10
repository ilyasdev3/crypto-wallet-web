import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Camera,
  MapPin,
  Link as LinkIcon,
  Mail,
  Calendar,
  Edit2,
  Github,
  Twitter,
  Linkedin,
  CheckCircle2,
  TrendingUp,
  Users,
  MessageSquare,
  Briefcase,
  Book,
  Share2,
  Search,
  UserPlus,
  UserCheck,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import RightColumnContent from "../../components/RightContentProfile";
import PageTemplate from "../../components/_layout";

// Followers/Following Dialog Component
const UserListDialog = ({ isOpen, onClose, type, users }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-200 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {type === "followers" ? "Followers" : "Following"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="mb-4">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              prefix={<Search className="w-4 h-4 text-gray-400" />}
            />
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {filteredUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 hover:bg-dark-100 rounded-lg transition-colors"
              >
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
                      ? "bg-dark-100 text-gray-400 hover:bg-dark-50"
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
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfilePage = () => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const followers = [
    {
      id: 1,
      name: "Sarah Connor",
      username: "@sarahc",
      avatar: "/api/placeholder/40/40",
      verified: true,
      isFollowing: true,
    },
    {
      id: 2,
      name: "John Doe",
      username: "@johndoe",
      avatar: "/api/placeholder/40/40",
      verified: false,
      isFollowing: false,
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "@emmaw",
      avatar: "/api/placeholder/40/40",
      verified: true,
      isFollowing: true,
    },
    // Add more followers...
  ];

  const following = [
    {
      id: 1,
      name: "Mike Johnson",
      username: "@mikej",
      avatar: "/api/placeholder/40/40",
      verified: true,
      isFollowing: true,
    },
    {
      id: 2,
      name: "Alice Brown",
      username: "@aliceb",
      avatar: "/api/placeholder/40/40",
      verified: false,
      isFollowing: true,
    },
    {
      id: 3,
      name: "David Lee",
      username: "@davidl",
      avatar: "/api/placeholder/40/40",
      verified: true,
      isFollowing: true,
    },
    // Add more following...
  ];

  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    username: "@alexthompson",
    role: "Senior Blockchain Developer",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coverPhoto:
      "https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Passionate about blockchain technology and decentralized systems. Contributing to open-source projects and building the future of Web3.",
    location: "San Francisco, CA",
    website: "alexthompson.dev",
    email: "alex@example.com",
    joinedDate: "Joined January 2023",
    verificationStatus: "Verified",
    work: "Blockchain Solutions Inc.",
    education: "MS Computer Science, Stanford University",
    socialLinks: {
      github: "github.com/alexthompson",
      twitter: "twitter.com/alexthompson",
      linkedin: "linkedin.com/in/alexthompson",
    },
    stats: {
      posts: 156,
      followers: 2840,
      following: 284,
    },
    recentActivity: [
      {
        id: 1,
        type: "post",
        content: "Just deployed a new smart contract on Ethereum mainnet! 🚀",
        timestamp: "2h ago",
        likes: 24,
        comments: 8,
      },
      {
        id: 2,
        type: "share",
        content: "Check out this amazing Web3 project I've been working on!",
        timestamp: "1d ago",
        likes: 156,
        comments: 23,
      },
    ],
  });

  return (
    <PageTemplate>
      <div className="min-h-screen bg-dark-300">
        {/* Cover Photo Section */}
        <div className="relative h-[250px]">
          <img
            src={profile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-4 right-4 p-2 rounded-lg bg-dark-50/80 text-white hover:bg-dark-50 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 transform -translate-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - About */}
            <div className="lg:col-span-1">
              <Card className="bg-dark-200 shadow-xl">
                <CardContent className="p-6">
                  {/* Profile Avatar */}
                  <div className="flex flex-col items-center -mt-16 mb-6">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border-4 border-dark-200">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-2 right-2 p-2 rounded-full bg-dark-100 text-white hover:bg-dark-50 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="text-2xl font-bold">{profile.name}</h1>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {profile.verificationStatus}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mt-1">{profile.username}</p>
                      <p className="text-primary-500">{profile.role}</p>
                    </div>

                    <button className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>

                  {/* Stats Cards */}
                  {/* <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-dark-100 rounded-lg hover:bg-dark-50 transition-colors cursor-pointer">
                    <div className="text-xl font-bold">
                      {profile.stats.posts}
                    </div>
                    <div className="text-gray-400 text-sm">Posts</div>
                  </div>
                  <div
                    className="text-center p-4 bg-dark-100 rounded-lg hover:bg-dark-50 transition-colors cursor-pointer"
                    onClick={() => setShowFollowers(true)}
                  >
                    <div className="text-xl font-bold">
                      {profile.stats.followers}
                    </div>
                    <div className="text-gray-400 text-sm">Followers</div>
                  </div>
                  <div
                    className="text-center p-4 bg-dark-100 rounded-lg hover:bg-dark-50 transition-colors cursor-pointer"
                    onClick={() => setShowFollowing(true)}
                  >
                    <div className="text-xl font-bold">
                      {profile.stats.following}
                    </div>
                    <div className="text-gray-400 text-sm">Following</div>
                  </div>
                </div> */}

                  {/* About Section */}
                  <div className="space-y-4">
                    <div className="border-t border-dark-100 pt-4">
                      <h2 className="text-lg font-semibold mb-4">About</h2>
                      <p className="text-gray-300 mb-4">{profile.bio}</p>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Briefcase className="w-4 h-4" />
                          <span>{profile.work}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Book className="w-4 h-4" />
                          <span>{profile.education}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <LinkIcon className="w-4 h-4" />
                          <a
                            href={`https://${profile.website}`}
                            className="text-primary-500 hover:underline"
                          >
                            {profile.website}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{profile.joinedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-dark-100">
                        <a
                          href={profile.socialLinks.github}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={profile.socialLinks.twitter}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a
                          href={profile.socialLinks.linkedin}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Posts & Activity */}
            <div className="lg:col-span-2">
              <RightColumnContent
                profile={profile}
                followers={followers}
                following={following}
              />
            </div>
          </div>
        </div>
        <UserListDialog
          isOpen={showFollowers}
          onClose={() => setShowFollowers(false)}
          type="followers"
          users={followers}
        />

        <UserListDialog
          isOpen={showFollowing}
          onClose={() => setShowFollowing(false)}
          type="following"
          users={following}
        />
      </div>
    </PageTemplate>
  );
};

export default ProfilePage;
