import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from "cloudinary";

export const uploadToCloudinary = async (
  file: any, 
  folder: string,
  height?: number,
  quality?: number
): Promise<UploadApiResponse> => {
  try {
    const options: UploadApiOptions = {
      folder,
      resource_type: "auto",
    };

    if (height) options.height = height;
    if (quality) options.quality = quality;

    if (!file.tempFilePath) {
      throw new Error("Invalid file path");
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error(`${error}`);
  }
};
