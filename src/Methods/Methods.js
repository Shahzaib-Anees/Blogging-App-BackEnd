import jwt from "jsonwebtoken";
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

// Upload Image to Storage
const uploadImage = async (file) => {};

export { generateAccessToken, generateRefreshToken, uploadImage };
