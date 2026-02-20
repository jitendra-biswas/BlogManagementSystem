const blogModel = require("../model/blog.model");

async function getblogs(req, res){
  try {
    const blogs = await blogModel.find();

    res.json({blogs});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


async function getBlogsById(req, res){
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
};



module.exports = {getblogs,getBlogsById};