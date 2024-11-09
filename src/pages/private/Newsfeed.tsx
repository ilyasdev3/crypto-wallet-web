import React, { useState } from "react";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";
import postsJson from "../../data/posts.json";

// Example posts for display

const Newsfeed: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState(postsJson);

  // Handle post creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        user: {
          name: "Current User", // Replace with logged-in user's name
          profilePicture:
            "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with logged-in user's profile picture
        },
        content: postContent,
        media: "",
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostContent(""); // Clear the input field
    }
  };

  // Handle like action
  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Handle comment submission
  const handleComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId && comment.trim()) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { user: "Current User", content: comment },
            ],
          };
        }
        return post;
      })
    );
  };

  return (
    <PageTemplate>
      <div className="space-y-8">
        {/* Create Post Section */}
        <div className="bg-dark-200 p-6 rounded-lg shadow-md">
          <Typography variant="h6" className="mb-4 font-semibold">
            Create a Post
          </Typography>
          <form onSubmit={handleCreatePost}>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full p-4 bg-dark-100 text-white rounded-md mb-4"
              placeholder="What's on your mind?"
              rows={4}
            />
            <button
              type="submit"
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
            >
              Post
            </button>
          </form>
        </div>

        {/* Post List Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-dark-200 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={post.user.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <Typography variant="h6">{post.user.name}</Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
              <Typography variant="body1" className="mb-4">
                {post.content}
              </Typography>
              {post.media && (
                <img
                  src={post.media}
                  alt="Post media"
                  className="w-full h-[300px] mb-4 rounded-md object-cover"
                />
              )}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center text-primary-500 hover:text-primary-600"
                >
                  👍 {post.likes}
                </button>
                <div className="flex items-center text-primary-500 hover:text-primary-600">
                  💬 {post.comments.length}
                </div>
              </div>
              {/* Comment Section */}
              {/* <div className="mt-4">
                <textarea
                  className="w-full p-2 bg-dark-100 text-white rounded-md mb-4"
                  placeholder="Add a comment"
                  rows={3}
                  onBlur={(e) => handleComment(post.id, e.target.value)}
                />
                <div className="space-y-4">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="border-t pt-2">
                      <Typography variant="body2" className="font-semibold">
                        {comment.user}:
                      </Typography>
                      <Typography variant="body2" className="text-gray-400">
                        {comment.content}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default Newsfeed;
