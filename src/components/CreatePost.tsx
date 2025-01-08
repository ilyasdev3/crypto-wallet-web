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
  X,
} from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../graphql/post/post.mutations";
import { GET_USER } from "../graphql/user/queries.user";
import { ensureHttps } from "../utils/imageUrlChecker";
import { showToast } from "../utils/toastConfig";

interface ImagePreview {
  file: File;
  preview: string;
  base64: string;
}

const CreatePost = ({}: any) => {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { loading: userLoading, error, data } = useQuery(GET_USER);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      showToast.success("Post created successfully");
      setContent("");
      setSelectedImages([]);
      setIsExpanded(false);
    },
    onError: (error) => {
      showToast.error(error.message || "Error creating post");
    },
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data:image/[type];base64, prefix
        const base64Data = base64String.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      showToast.error("Please select a valid image file");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast.error("File size must be less than 5MB");
      return false;
    }

    return true;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setIsUploading(true);

    try {
      const imagePromises = files.map(async (file) => {
        if (!validateFile(file)) {
          return null;
        }

        const base64 = await convertToBase64(file);
        const preview = URL.createObjectURL(file);

        return {
          file,
          preview,
          base64,
        };
      });

      const images = await Promise.all(imagePromises);
      const validImages = images.filter(
        (img): img is ImagePreview => img !== null
      );
      setSelectedImages((prev) => [...prev, ...validImages]);
    } catch (error) {
      showToast.error("Error processing images");
      console.error("Error processing images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && selectedImages.length === 0) {
      showToast.error("Please add some content or images to your post");
      return;
    }

    try {
      await createPost({
        variables: {
          post: {
            title: content,
            content: content,
            image: selectedImages[0]?.base64, // Currently handling single image
          },
        },
      });
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <Card className="bg-dark-50 border border-dark-100 pt-2">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={ensureHttps(data?.me?.profileImage)}
                alt="User"
              />
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
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-dark-300/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
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
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={isUploading}
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
                    disabled={
                      (!content.trim() && selectedImages.length === 0) ||
                      loading ||
                      isUploading
                    }
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      (!content.trim() && selectedImages.length === 0) ||
                      loading ||
                      isUploading
                        ? "bg-dark-200 text-gray-400 cursor-not-allowed"
                        : "bg-primary-500 hover:bg-primary-600 text-white"
                    }`}
                  >
                    {loading || isUploading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {loading || isUploading ? "Processing..." : "Post"}
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
