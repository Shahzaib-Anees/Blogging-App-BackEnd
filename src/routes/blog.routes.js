import express from "express";
import { addBlog } from "../controllers/blog.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
const blogRoutes = express.Router();

blogRoutes.post("/addBlog", upload.single("image"), addBlog);

export { blogRoutes };
