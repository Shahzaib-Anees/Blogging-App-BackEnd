import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  uploadImageToDb,
  updateUser,
  getSingleUser
} from "../controllers/controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const userRoutes = express.Router();



userRoutes.get("/data/:id", getSingleUser);
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logOutUser);
userRoutes.post("/upload/:id", upload.single("image"), uploadImageToDb);
userRoutes.post("/update/:id", updateUser);

export { userRoutes };
