const express = require("express");
const multer = require("multer");
const ImageKit = require("imagekit");
const blogModel = require("../models/blog");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_END_POINT_URL,
});

// Fix route path here: remove repeated /blog
router.post("/editor", upload.single("image"), async (req, res) => {
  try {
    const { Title, SubTitle, Category, content } = req.body;

    if (!Title || !SubTitle || !Category || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      imageUrl = result.url;
    }

  const blog = await blogModel.create({
  title: Title,
  subTitle : SubTitle,
  category: Category,
  description: content,
  image: imageUrl,
});

    res.status(201).json({ message: "success", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
