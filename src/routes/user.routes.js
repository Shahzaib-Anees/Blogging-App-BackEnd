import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/controllers.js";
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logOutUser);

export { userRoutes };
