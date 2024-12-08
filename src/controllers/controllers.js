import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Methods/Methods.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  const ifUserExists = await userModel.findOne({ email });
  if (ifUserExists)
    return res.status(400).json({ message: "User already exists" });

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
    ACCESS_TOKEN: accessToken,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exist" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid password" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "User logged in successfully",
    user,
    ACCESS_TOKEN: accessToken,
  });
};

const logOutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "User logged out successfully" });
};

export { registerUser, loginUser, logOutUser };
