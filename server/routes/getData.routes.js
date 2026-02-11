const express = require("express");
const blogModel = require("../model/blog.model");

const router = express.Router();
router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await blogModel.find();

    res.json({blogs});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getBlogsById/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;