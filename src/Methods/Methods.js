import { v2 as cloudinary } from 'cloudinary';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Cloudinary Configs 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload Image to Storage
const uploadImage = async (file) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    }
    )
    return uploadResult.url;
  } catch (error) {
    console.log("Error while uploading Image", error);
    return error;
  }
};
export { generateAccessToken, generateRefreshToken, uploadImage };
