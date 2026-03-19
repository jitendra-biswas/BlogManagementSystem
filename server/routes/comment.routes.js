const express = require("express");
const Comment = require("../model/comment.model");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const Blog = require('../model/blog.model')
const router = express.Router();

// POST COMMENT
router.post("/postComment/:id", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const { description } = req.body;
    const { id } = req.params;

    const comment = await Comment.create({
  pageID: id,
  userId: user._id,  // 🔥 new
  name: user.username,
  description,
  status: "pending",
});

    res.status(201).json({
      message: "Comment submitted for approval",
      comment,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// GET COMMENTS
router.get("/getComment/:pageID", async (req, res) => {
  try {
    const { pageID } = req.params;

    const comments = await Comment.find({
      pageID,
      status: "approved", // ✅ important filter
    });

    res.status(200).json({ comments });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//GET ALL APPROVED COMMENTS
router.get("/approved/comments", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get blogs owned by this user
    const blogs = await Blog.find({ userId: user._id }).select("_id");
    const blogIds = blogs.map(b => b._id);

    // Fetch approved comments for user's blogs with populated title
    const comments = await Comment.find({
      status: "approved",
      pageID: { $in: blogIds },
    }).populate("pageID", "title"); // ✅ populate blog title

    res.status(200).json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//PENDING COMMENTS FOR USER'S BLOGS
router.get("/pending/comments", async (req, res) => {
  try {
    // Check for token
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Decode user from JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find all blogs owned by this user
    const blogs = await Blog.find({ userId: user._id }).select("_id");
    const blogIds = blogs.map(b => b._id);

    // Fetch pending comments for these blogs only
    const comments = await Comment.find({
      status: "pending",
      pageID: { $in: blogIds },
    }).populate("pageID", "title"); // populate blog title

    res.status(200).json({ comments });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/admin/comment/:id", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const { status } = req.body;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const blog = await Blog.findById(comment.pageID);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // only allow comment updates for blog owner
    if (blog.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "You cannot modify comments on other users' blogs" });
    }

    comment.status = status;
    await comment.save();

    // populate blog title so frontend can display it
    await comment.populate("pageID", "title");

    res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    console.error("Failed to update comment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//DELETE COMMENT
router.delete("/deleteComment/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;