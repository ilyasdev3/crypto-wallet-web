import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/comments/comment.mutations";
import { GET_POST } from "../../graphql/post/post.queries";
import { GET_COMMENTS } from "../../graphql/comments/comment.queries";
import Button from "../ui/Button";

interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  createdAt: string;
}

interface PostWithCommentsProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

const SinglePostModal: React.FC<PostWithCommentsProps> = ({
  postId,
  isOpen,
  onClose,
}) => {
  const [commentContent, setCommentContent] = useState("");

  const {
    data: postData,
    loading: postLoading,
    error: postError,
    refetch: refetchPost,
  } = useQuery(GET_POST, {
    variables: { getPost: postId },
    skip: !postId,
  });

  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery(GET_COMMENTS, {
    variables: { id: postId },
    skip: !postId,
  });

  const [createComment, { loading: commentLoading }] = useMutation(
    CREATE_COMMENT,
    {
      onCompleted: () => {
        setCommentContent("");
        refetchPost();
        refetchComments();
      },
      onError: (error) => {
        console.error("Error creating comment:", error);
      },
    }
  );

  const handleCommentSubmit = () => {
    createComment({
      variables: {
        comment: {
          postId,
          content: commentContent,
        },
      },
    });
  };

  if (postLoading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (postError || commentsError) {
    return <div>Error loading data</div>;
  }

  const post = postData?.getPost;
  const comments = commentsData?.getComments || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-200 border-none sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Post Details
          </DialogTitle>
        </DialogHeader>

        <Card className="bg-dark-200 border-none">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post?.userId?.profileImage} />
                  <AvatarFallback>{post?.userId?.firstName}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-white">
                    {post?.userId?.firstName} {post?.userId?.lastName}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {post?.userId?.username}
                  </p>
                </div>
              </div>
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
                <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{post?.likes?.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post?.stats?.totalComments || 0}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors">
                  {/* <Share2 className="w-5 h-5" /> */}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 space-y-4 text-white">
          <h3 className="text-lg font-semibold text-white">Comments</h3>

          <div className="flex items-center gap-2">
            <textarea
              placeholder="Write a comment..."
              className="flex-1 p-2 bg-dark-100 border-none"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button
              variant="primary"
              size="small"
              onClick={handleCommentSubmit}
              disabled={commentLoading}
            >
              {commentLoading ? "Posting..." : "Post"}
            </Button>
          </div>

          <div className="space-y-4 max-h-[200px] overflow-y-auto">
            {comments.map((comment: Comment) => (
              <div key={comment?.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={comment?.user?.profileImage} />
                  <AvatarFallback>
                    {comment?.user?.firstName
                      ? comment?.user?.firstName
                      : "Anonymous"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">
                      {comment?.user?.firstName} {comment?.user?.lastName}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {new Date(comment?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-200 mt-1">{comment?.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SinglePostModal;
