// utils/imageProcessing.ts
import { showToast } from "./toastConfig";

interface ProcessedImage {
  base64: string;
  size: number;
}

export const processImage = async (file: File): Promise<ProcessedImage> => {
  // Maximum width and height for the processed image
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 800;
  const MAX_FILE_SIZE = 1024 * 1024; // 1MB

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          showToast.error("Failed to get canvas context");

          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Start with high quality
        let quality = 0.9;
        let base64 = canvas.toDataURL("image/jpeg", quality);
        let size = Math.round(
          (base64.length - "data:image/jpeg;base64,".length) * 0.75
        );

        // Reduce quality until file size is under limit
        while (size > MAX_FILE_SIZE && quality > 0.1) {
          quality -= 0.1;
          base64 = canvas.toDataURL("image/jpeg", quality);
          size = Math.round(
            (base64.length - "data:image/jpeg;base64,".length) * 0.75
          );
        }

        resolve({
          base64,
          size,
        });
      };

      img.onerror = () => {
        showToast.error("Failed to load image");
      };
    };

    reader.onerror = () => {
      showToast.error("Failed to read image");
    };

    reader.readAsDataURL(file);
  });
};
