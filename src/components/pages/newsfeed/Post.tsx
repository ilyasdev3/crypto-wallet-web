import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface PostProps {
  post: any;
  userData: any;
  handleLikePost: (postId: string) => void;
  handleBookmark: (postId: string, e: React.MouseEvent) => void;
  getTimeAgo: (date: string) => string;
  onClick: () => void;
}

const Post: React.FC<PostProps> = ({
  post,
  userData,
  handleLikePost,
  handleBookmark,
  getTimeAgo,
  onClick,
}) => {
  return (
    <Card className="bg-dark-200 border-none hover:bg-dark-100 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post?.userId?.profileImage} />
              <AvatarFallback>{post?.user?.firstName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-white">
                  {post?.userId?.firstName} {post?.userId?.lastName}
                </h4>
              </div>
              <p className="text-sm text-gray-400">{post?.userId?.username}</p>
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
              src={post?.image}
              alt="Post media"
              className="w-full max-h-[400px] object-cover"
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
                  post?.likes?.includes(userData?.me?.id)
                    ? "text-primary-500 fill-current"
                    : ""
                }`}
              />
              <span>{post?.likes?.length || 0}</span>
            </button>
            <button
              onClick={onClick}
              className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post?.stats?.totalComments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={(e) => handleBookmark(post.id, e)}
            className="text-gray-400 hover:text-primary-500 transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
