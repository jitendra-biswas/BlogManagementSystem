const express = require("express");
const blogController = require('../controllers/blog.controller')

const router = express.Router();
router.get("/getblogs",blogController.getblogs)

router.get("/getBlogsById/:id",blogController.getBlogsById)



module.exports = router;