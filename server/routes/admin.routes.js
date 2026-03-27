const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/blogs", adminController.getPendingBlogs);
router.put("/blogs/:blogId/approve", adminController.approveBlog);
router.put("/blogs/:blogId/reject", adminController.rejectBlog);
router.delete("/blogs/:blogId", adminController.deleteBlog);

module.exports = router;
