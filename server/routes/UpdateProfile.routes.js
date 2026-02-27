const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const uploadServics = require("../services/uploadFile.service");

const upload = multer({ storage: multer.memoryStorage() });

router.put("/updateProfile", upload.single("image"), async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, handle, bio } = req.body;

    let profileImageUrl;
    if (req.file) {
      const result = await uploadServics.uploadFile(req.file.buffer);
      profileImageUrl = result.url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        username,
        handle,
        bio,
        profileImage: profileImageUrl
      },
      { new: true }
    );

    res.status(200).json({ message: "success", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;