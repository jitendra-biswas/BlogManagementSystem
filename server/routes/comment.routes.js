const express = require("express");
const Comment = require("../model/comment.model");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const router = express.Router();

// POST COMMENT
router.post("/postComment/:id", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const { description } = req.body;
    const { id } = req.params;

   const comment = await Comment.create({
     pageID: id,
     name: user.username,
     description,
   });

   res.status(201).json({
     message: "Comment added successfully",
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

    const comments = await Comment.find({ pageID });

    res.status(200).json({
      comments,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
});

module.exports = router;