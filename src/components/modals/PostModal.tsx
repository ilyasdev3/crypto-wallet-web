import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../components/ui/dialog";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  ThumbsUp,
  SmilePlus,
  Image as ImageIcon,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
  isVerified?: boolean;
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  isLiked?: boolean;
}

interface Post {
  id: string;
  user: User;
  content: string;
  images?: string[];
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleString();
};

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, post }) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: {
          id: "current-user",
          name: "Current User",
          username: "currentuser",
          avatar: "/current-user-avatar.jpg",
        },
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };

      setComments((prev) => [newCommentObj, ...prev]);
      setNewComment("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-50 border border-dark-100 sm:max-w-[700px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="sticky top-0 z-10 bg-dark-50 border-b border-dark-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="aspect-square h-full w-full"
                />
                <AvatarFallback>
                  {post.user.name ? post.user.name.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{post.user.name}</h3>
                  {post.user.isVerified && (
                    <Badge variant="default" className="bg-accent-blue">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-400">@{post.user.username}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-dark-100 rounded-full">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-dark-100">
            <p className="text-base mb-4 whitespace-pre-wrap">{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-1 gap-2 mb-4">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="rounded-lg w-full"
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{formatTimestamp(post.timestamp)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-dark-100">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 hover:text-primary-500 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? "fill-primary-500 text-primary-500" : ""
                  }`}
                />
                <span>{likesCount}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>{post.shares}</span>
              </button>
            </div>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`hover:text-primary-500 transition-colors ${
                isBookmarked ? "text-primary-500" : ""
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? "fill-primary-500" : ""}`}
              />
            </button>
          </div>

          <div className="flex-1">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 border-b border-dark-100">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 rounded-full">
                    <AvatarImage
                      src={comment.user.avatar || "/current-user-avatar.jpg"}
                      alt={comment.user.name || "Current user"}
                      className="aspect-square h-full w-full"
                    />
                    <AvatarFallback>
                      {comment.user.name ? comment.user.name.charAt(0) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{comment.user.name}</span>
                      <span className="text-sm text-gray-400">
                        @{comment.user.username}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <button className="flex items-center gap-1 hover:text-primary-500">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="hover:text-primary-500">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-dark-50 border-t border-dark-100 p-4">
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center gap-3"
          >
            <Avatar className="w-8 h-8 rounded-full">
              <AvatarImage
                src="/current-user-avatar.jpg"
                alt="Current user"
                className="aspect-square h-full w-full"
              />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 hover:bg-dark-100 rounded-full text-gray-400 hover:text-primary-500"
                >
                  <SmilePlus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-dark-100 rounded-full text-gray-400 hover:text-primary-500"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Button
              variant="primary"
              size="medium"
              className="w-full"
              children="Send"
            ></Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
