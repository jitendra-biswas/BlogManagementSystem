const blogModel = require('../model/blog.model')
const uploadServics = require('../services/uploadFile.service')


async function editor(req,res){
 try {
    const { Title, SubTitle, Category, content } = req.body;

    if (!Title || !SubTitle || !Category || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result =await uploadServics.uploadFile(req.file.buffer)

  const blog = await blogModel.create({
  title: Title,
  subTitle : SubTitle,
  category: Category,
  description: content,
  image: result.url,
});

    res.status(201).json({ message: "success", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {editor}