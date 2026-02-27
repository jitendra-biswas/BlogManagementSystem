const express = require("express");
const multer = require("multer");
const router = express.Router();
const editorController = require('../controllers/editor.controller')
const upload = multer({ storage: multer.memoryStorage() });



// Fix route path here: remove repeated /blog
router.post("/editor", upload.single("image"),editorController.editor) 
router.put("/updateBlogs/:id", upload.single("image"),editorController.updateBlogs); 
 router.delete("/deleteBlog/:id",editorController.deleteBlog)
module.exports = router;
