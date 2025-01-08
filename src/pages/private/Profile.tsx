import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/user/queries.user";
import { ensureHttps } from "../../utils/imageUrlChecker";
import {
  ArrowLeft,
  CheckCircle2,
  Edit2Icon,
  Mail,
  MapPin,
  Calendar,
  Link2,
  Github,
  Linkedin,
  Users,
  Image as ImageIcon,
  Activity,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { GET_USER_TRANSACTIONS } from "../../graphql/transaction/query.transaction";

import {
  GET_USER_FOLLOWERS,
  GET_USER_FOLLOWING,
} from "../../graphql/user/queries.user";

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_USER);

  // const {
  //   loading: userFollowersLoader,
  //   error: userFollowersError,
  //   data: userFollowersData,
  //   refetch: refetchUserFollowers,
  // } = useQuery(GET_USER_FOLLOWERS, {
  //   variables: {
  //     getUserFollowersId: userId,
  //   },
  // });
  // const {
  //   loading: userFollowingLoader,
  //   error: userFollowingError,
  //   data: userFollowingData,
  //   refetch: refetchUserFollowing,
  // } = useQuery(GET_USER_FOLLOWING, {
  //   variables: {
  //     getUserFollowingId: userId,
  //   },
  // });

  const {
    data: transactionsData,
    loading: isTransactionsLoading,
    refetch,
  } = useQuery(GET_USER_TRANSACTIONS);

  const navigate = useNavigate();

  const stats = [
    {
      label: "Following",
      value: data?.me?.following?.length || 0,
      icon: Users,
    },
    {
      label: "Followers",
      value: data?.me?.followers?.length || 0,
      icon: Users,
    },
    // { label: "Transactions", value: "2.5K", icon: Activity },
    // { label: "Balance", value: "12.4 ETH", icon: Wallet },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="min-h-screen bg-dark-300">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed z-50 top-4 left-4 flex items-center px-4 py-2 bg-dark-100/80 backdrop-blur-sm text-white rounded-lg hover:bg-dark-50 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Cover Photo Section */}
      <div className="relative h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-300/90">
          <img
            src={
              ensureHttps(data?.me?.coverImage) || "/api/placeholder/1200/400"
            }
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <Card className="lg:row-span-2 bg-dark-200 border-none">
            <CardContent className="p-6">
              {/* Profile Image & Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={
                      ensureHttps(data?.me?.profileImage) ||
                      "/api/placeholder/150/150"
                    }
                    alt={data?.me?.username}
                    className="w-32 h-32 rounded-full border-4 border-dark-200 shadow-xl mx-auto"
                  />
                  <Badge className="absolute bottom-2 right-2 bg-primary-500">
                    <ImageIcon className="w-4 h-4" />
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-center space-x-2">
                    <h1 className="text-2xl font-bold text-white">
                      {data?.me?.firstName} {data?.me?.lastName}
                    </h1>
                    <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  </div>
                  <p className="text-gray-400 mt-1">@{data?.me?.username}</p>
                </div>

                <button
                  onClick={() => navigate(`/edit-profile/${data.me.username}`)}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Edit2Icon className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-dark-100 p-4 rounded-lg text-center"
                  >
                    <stat.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {data?.me?.email && (
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Mail className="w-5 h-5 text-primary-500" />
                    <span>{data.me.email}</span>
                  </div>
                )}
                {data?.me?.location && (
                  <div className="flex items-center space-x-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span>{data.me.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-gray-400">
                  <Calendar className="w-5 h-5 text-primary-500" />
                  <span>
                    Joined {new Date(data?.me?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              {/* <div className="mt-6 pt-6 border-t border-dark-100">
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  Social Profiles
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>@{data?.me?.username}</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-3 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>
                      {data?.me?.firstName} {data?.me?.lastName}
                    </span>
                  </a>
                  {data?.me?.website && (
                    <a
                      href={data.me.website}
                      className="flex items-center space-x-3 text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <Link2 className="w-5 h-5" />
                      <span>Personal Website</span>
                    </a>
                  )}
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="col-span-2 text-white bg-dark-200 border-none">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 whitespace-pre-line">
                {data?.me?.bio || "No bio provided yet."}
              </p>
            </CardContent>
          </Card>

          {/* Activity Section */}
          <Card className="col-span-2 text-white bg-dark-200 border-none">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionsData?.getUserTransactions
                  ?.slice(0, 3)
                  .map((tx: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 text-white bg-dark-100 rounded-lg"
                    >
                      <Activity className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-white">Transaction completed</p>
                        <p className="text-sm text-gray-400">
                          {tx.amount} ETH transferred to
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
