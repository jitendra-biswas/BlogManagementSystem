const blogModel = require("../model/blog.model");
const uploadServics = require("../services/uploadFile.service");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

async function editor(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const { Title, SubTitle, Category, content } = req.body;

    if (!Title || !SubTitle || !Category || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await uploadServics.uploadFile(req.file.buffer);

    const blog = await blogModel.create({
      title: Title,
      subTitle: SubTitle,
      category: Category,
      description: content,
      userId: user._id,
      image: result.url,
    });

    res.status(201).json({ message: "success", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
async function updateBlogs(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const { title, subTitle, category, content } = req.body;

    let imageUrl;

    // ✅ Only upload if new image selected
    if (req.file) {
      const result = await uploadServics.uploadFile(req.file.buffer);
      imageUrl = result.url;
    }

    const blog = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subTitle,
        category,
        description: content,
        image: imageUrl
      },
      { new: true }
    );

    res.status(200).json({ message: "success", blog });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deletedBlog = await blogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

module.exports = { editor, deleteBlog, updateBlogs };
