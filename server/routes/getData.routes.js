const express = require("express");
const blogController = require('../controllers/blog.controller')

const router = express.Router();
router.get("/getblogs",blogController.getblogs)
router.get("/getUserBlogs",blogController.getUserBlogs)
router.get("/latestBlogs",blogController.latestBlogs)
router.get("/getBlogsById/:id",blogController.getBlogsById)



module.exports = router;