const blogModel = require("../model/blog.model");
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken");
const multer = require('multer')

async function getblogs(req, res) {
  try {
    // Public blog list only shows approved blogs.
    const blogs = await blogModel.find({ status: "approved" });

    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
async function getUserBlogs(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Fetch blogs for this user
    const blogs = await blogModel.find({ userId: user._id });

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
async function latestBlogs(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Fetch blogs for this user
    const blogs = await blogModel.find({ userId: user._id }).limit(3);

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getBlogsById(req, res) {
  try {
    const { id } = req.params;

    const token = req.cookies.token;
    let user = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await userModel.findOne({ email: decoded.email });
      } catch (e) {
        user = null;
      }
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.status !== "approved") {
      if (!user) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const isOwner = user._id.toString() === blog.userId?.toString();
      if (!isOwner && !user.isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = { getblogs, getUserBlogs, getBlogsById,latestBlogs};
