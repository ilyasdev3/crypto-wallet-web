import React, { useEffect, useState } from "react";
import PageTemplate from "../../components/_layout";
import { Card, CardContent } from "../../components/ui/card";
import PostModal from "../../components/modals/PostModal";
import postsJson from "../../data/posts.json";
import CreatePost from "../../components/CreatePost";
import { Input } from "../../components/ui/input";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Send,
  Bookmark,
  TrendingUp,
  Heart,
  Award,
  Filter,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_USER_POSTS } from "../../graphql/post/post.queries";
import { ensureHttps } from "../../utils/imageUrlChecker";
import FilterTabs from "../../components/FilterTabs";
import { GET_TOP_USERS, GET_USER } from "../../graphql/user/queries.user";
import { FOLLOW_USER_UNFOLLOW_USER } from "../../graphql/user/mutation.user";

const Newsfeed: React.FC = () => {
  const [posts, setPosts] = useState(postsJson);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState("latest");
  const filterOptions = [
    { value: "latest", label: "Latest" },
    { value: "trending", label: "Trending" },
    { value: "following", label: "Following" },
  ];

  const { data: userData, refetch } = useQuery(GET_USER);

  const {
    loading,
    error,
    data: allPosts,
    refetch: refetchPosts,
  } = useQuery(GET_ALL_POSTS, {
    variables: {
      filters: {
        length: 10,
        filter: filter,
      },
    },
    fetchPolicy: "network-only", // Fetch fresh data every time
  });
  const {
    loading: userLoading,
    error: userError,
    data: topUsers,
    // refetch: refetchPosts,
  } = useQuery(GET_TOP_USERS, {
    variables: {
      filters: {
        length: 10,
        filter: filter,
      },
    },
    fetchPolicy: "network-only", // Fetch fresh data every time
  });

  const [followUser, { loading: followLoading }] = useMutation(
    FOLLOW_USER_UNFOLLOW_USER,
    {
      onCompleted: (data) => {
        console.log("User followed successfully:", data);
        refetch();
      },
      onError: (error) => {
        console.error("Error following user:", error);
      },
    }
  );

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post: any) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleBookmark = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(
      posts.map((post: any) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const getTimeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    refetchPosts({
      filters: {
        length: 10,
      },
    });
  }, [filter]);

  const checkIfUserFollows = (userId: string) => {
    return userData?.me?.following?.some((id: any) => id === userId);
  };

  // const {
  //   loading: userPostsLoader,
  //   error: userPostsError,
  //   data: userPostsData,
  //   refetch: refetchUserPosts,
  // } = useQuery(GET_USER_POSTS, {
  //   variables: {
  //     getUserPostsId: userId,
  //   },
  // });

  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:block hidden">
            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Trending Topics
                </h3>
                <div className="space-y-4">
                  {["#Crypto", "#NFT", "#DeFi", "#Web3"].map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        <span className="text-gray-300 hover:text-primary-500 cursor-pointer">
                          {topic}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">2.5K posts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Top Contributors
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={`/api/placeholder/${150 + index}/150`}
                        />
                        <AvatarFallback>TC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">
                          User {index + 1}
                        </p>
                        <p className="text-xs text-gray-400">1.2K followers</p>
                      </div>
                      <Badge className="ml-auto bg-primary-500/10 text-primary-500">
                        <Award className="w-3 h-3 mr-1" />
                        Top
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <CreatePost />

            {/* Filter Options */}
            <FilterTabs
              options={filterOptions}
              value={filter}
              onValueChange={setFilter}
            />
            {/* Posts */}
            <div className="space-y-6">
              {allPosts?.getAllPosts.length > 0
                ? allPosts?.getAllPosts.map((post: any, index: any) => (
                    <Card
                      key={post.id}
                      className="bg-dark-200 border-none hover:bg-dark-100 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage
                                src={ensureHttps(post?.userId?.profileImage)}
                              />
                              <AvatarFallback>
                                {post?.user?.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-white">
                                  {post?.user?.name}
                                </h4>
                                {/* {post.user.isVerified && (
                              <Badge className="bg-primary-500/10 text-primary-500">
                                <Award className="w-3 h-3" />
                              </Badge>
                            )} */}
                              </div>
                              <p className="text-sm text-gray-400">
                                {getTimeAgo(post?.createdAt)}
                              </p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-300">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="mt-4 text-gray-200">{post?.content}</p>

                        {post?.image && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <img
                              src={ensureHttps(post?.image)}
                              alt="Post media"
                              className="w-full object-cover"
                            />
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between border-t border-dark-100 pt-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikePost(post?.id)}
                              className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors"
                            >
                              <Heart
                                className={`w-5 h-5 ${
                                  post?.likes > 0
                                    ? "text-primary-500 fill-current"
                                    : ""
                                }`}
                              />
                              <span>{post?.likes}</span>
                            </button>
                            <button
                              // onClick={() => setSelectedPost(post)}
                              className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors"
                            >
                              <MessageCircle className="w-5 h-5" />
                              <span>{post?.comments?.length}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors">
                              <Share2 className="w-5 h-5" />
                              {/* <span>{post.shares || 0}</span> */}
                            </button>
                          </div>
                          <button
                            onClick={(e) => handleBookmark(post.id, e)}
                            className={`text-gray-400 hover:text-primary-500 transition-colors
                       
                          `}
                          >
                            <Bookmark className="w-5 h-5" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : ""}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Suggested Users
                </h3>
                <div className="space-y-4">
                  {topUsers?.getTopUsers.map((user: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={ensureHttps(user?.profilePicture)}
                          />
                          <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-400">
                            @{user?.username}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          followUser({
                            variables: {
                              userId: user.id,
                            },
                          })
                        }
                        className="text-primary-500 text-sm hover:text-primary-600"
                      >
                        {checkIfUserFollows(user.id) ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {isModalOpen && selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPost(null);
          }}
          isOpen={isModalOpen}
        />
      )}
    </PageTemplate>
  );
};

export default Newsfeed;
