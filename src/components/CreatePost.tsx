import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import {
  ImageIcon,
  Smile,
  Link as LinkIcon,
  AtSign,
  Hash,
  Send,
} from "lucide-react";

const CreatePost = ({
  onSubmit,
  userAvatar = "/api/placeholder/32/32",
}: any) => {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({ content, images: selectedImages });
      setContent("");
      setSelectedImages([]);
      setIsExpanded(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    setSelectedImages(files.map((file: File) => file.name));
  };

  return (
    <Card className="bg-dark-50 border border-dark-100">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={userAvatar} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div
                className={`bg-dark-100 rounded-lg transition-all ${
                  isExpanded ? "min-h-[120px]" : "min-h-[48px]"
                }`}
              >
                <textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  className="w-full h-full min-h-[inherit] p-3 bg-transparent border-none resize-none focus:outline-none text-white placeholder-gray-400"
                />

                {selectedImages.length > 0 && (
                  <div className="px-3 pb-3 flex flex-wrap gap-2">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="bg-dark-200 rounded px-2 py-1 text-sm text-gray-400 flex items-center gap-2"
                      >
                        <ImageIcon size={14} />
                        {image}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isExpanded && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="p-2 rounded-full hover:bg-dark-200 cursor-pointer transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </label>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-dark-200 transition-colors"
                    >
                      <Smile className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-dark-200 transition-colors"
                    >
                      <LinkIcon className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-dark-200 transition-colors"
                    >
                      <AtSign className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full hover:bg-dark-200 transition-colors"
                    >
                      <Hash className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      content.trim()
                        ? "bg-primary-500 hover:bg-primary-600 text-white"
                        : "bg-dark-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
