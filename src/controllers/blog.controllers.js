import mongoose from "mongoose";
import blogSchema from "../models/blog.model.js";
import { uploadImage } from "../Methods/Methods.js";

// add blog
const addBlog = async (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "Blog should have an image" });
  }
  const image = req.file.path;
  let imageUrl;
  if (!image) {
    return res
      .status(400)
      .json({ error: "No Blog image is provided to upload" });
  } else {
    try {
      const response = await uploadImage(image);
      imageUrl = response;
    } catch (error) {
      console.log(error);
      imageUrl = "";
      return res.status(500).json({ error: "Error uploading image" });
    }
  }
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }
  const blog = await blogSchema.create({
    title,
    description,
    image: imageUrl,
  });
  return res.status(200).json({
    success: true,
    message: "blog added successfully",
    blog,
  });
};

// get all blog
const getAllBlogs = async (req, res) => {
  const blogs = await blogSchema.find({});
  if (!blogs) {
    return res.status(404).json({
      success: false,
      message: "No blogs found",
    });
  }

  res.send(blogs);
};

// get Single blog
const getBlogWithId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID",
    });
    return;
  }
  const blog = await blogSchema.findById(id);
  if (!blog) {
    res.status(404).json({
      message: `No blog with id : ${id}`,
    });
    return;
  }

  res.status(200).json({
    message: "blog found",
    blog: blog,
  });
};

// Update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID",
    });
    return;
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }
  const blog = await blogSchema.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
    }
  );
  if (!blog) {
    res.status(404).json({
      message: `No blog with id : ${id}`,
    });
    return;
  }
  res.status(200).json({
    message: "blog Updated Successfully",
    blog: blog,
  });
};

// Delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID",
    });
    return;
  }

  const blog = await blogSchema.findByIdAndDelete({ _id: id });
  if (!blog) {
    res.status(404).json({
      message: `No blog with id : ${id}`,
    });
    return;
  }

  res.status(200).json({
    message: "blog deleted successfully",
    blog: blog,
  });
};

export { addBlog, getAllBlogs, getBlogWithId, updateBlog, deleteBlog };
