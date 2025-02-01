import React, { useEffect, useState } from "react";
import PageTemplate from "../../components/_layout";
import CreatePost from "../../components/CreatePost";
import FilterTabs from "../../components/FilterTabs";
import Post from "../../components/pages/newsfeed/Post";
import TrendingTopics from "../../components/pages/newsfeed/TrendingTopics";
import TopContributors from "../../components/pages/newsfeed/TopContributors";
import SuggestedUsers from "../../components/pages/newsfeed/SuggestedUsers";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TOP_USERS, GET_USER } from "../../graphql/user/queries.user";
import { FOLLOW_USER_UNFOLLOW_USER } from "../../graphql/user/mutation.user";
import {
  GET_ALL_POSTS,
  GET_USER_FOLLOWING_POSTS,
} from "../../graphql/post/post.queries";
import { DO_LIKE } from "../../graphql/post/post.mutations";
import SinglePostModal from "../../components/modals/SinglePostModal";

const Newsfeed: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("Trending");
  const [posts, setPosts] = useState<any>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData, refetch: refetchUser } = useQuery(GET_USER);
  const { data: allPosts, refetch: refetchPosts } = useQuery(GET_ALL_POSTS, {
    variables: { filters: { length: 10 } },
    fetchPolicy: "network-only",
  });
  const { data: userFollowersPosts, refetch: refetchUserFollowersPosts } =
    useQuery(GET_USER_FOLLOWING_POSTS);
  const { data: topUsers } = useQuery(GET_TOP_USERS, {
    variables: { filters: { length: 10 } },
    fetchPolicy: "network-only",
  });

  console.log("userFollowersPosts", userFollowersPosts);

  const [followUser] = useMutation(FOLLOW_USER_UNFOLLOW_USER, {
    onCompleted: () => refetchUser(),
  });

  const [toggleLike] = useMutation(DO_LIKE, {
    onCompleted: () => refetchPosts(),
  });

  const handleLikePost = (postId: string) => {
    toggleLike({ variables: { postId } });
  };

  const handleBookmark = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts((prevPosts: any) =>
      prevPosts.map((post: any) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  // console.log("posts", posts);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
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

  const checkIfUserFollows = (userId: string) => {
    return userData?.me?.following?.some((id: any) => id === userId);
  };

  useEffect(() => {
    if (selectedTab === "Trending") {
      setPosts(allPosts?.getAllPosts || []);
    } else if (selectedTab === "Following") {
      setPosts(userFollowersPosts?.getFollowingPosts || []);
    }
  }, [selectedTab, allPosts, userFollowersPosts]);

  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:block hidden">
            <TrendingTopics />
            <TopContributors />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CreatePost />
            <FilterTabs
              options={[
                { value: "Trending", label: "Trending" },
                { value: "Following", label: "Following" },
              ]}
              value={selectedTab}
              onValueChange={setSelectedTab}
            />
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post: any) => (
                  <Post
                    key={post.id}
                    post={post}
                    userData={userData}
                    handleLikePost={handleLikePost}
                    handleBookmark={handleBookmark}
                    getTimeAgo={getTimeAgo}
                    onClick={() => handlePostClick(post)}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <p>No posts yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <SuggestedUsers
              topUsers={topUsers?.getTopUsers}
              followUser={(userId) => followUser({ variables: { userId } })}
              checkIfUserFollows={checkIfUserFollows}
            />
          </div>
        </div>
      </div>

      {/* Post with Comments Modal */}
      {selectedPost && (
        <SinglePostModal
          postId={selectedPost.id}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPost(null);
          }}
        />
      )}
    </PageTemplate>
  );
};

export default Newsfeed;
