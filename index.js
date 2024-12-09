import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { userRoutes } from "./src/routes/user.routes.js";
import connectDB from "./src/db/index.js";
import { blogRoutes } from "./src/routes/blog.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

(async () => {
  try {
    const res = await connectDB();
    console.log(res);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
