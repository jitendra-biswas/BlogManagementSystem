const express = require("express");
const blogModel = require("../models/blog");

const router = express.Router();

router.get("/getblogs", async (req,res)=>{
   try{
     const blogData =  await blogModel.find();
     res.json(blogData);
   }
   catch(error){
     res.status(500).json({ message: "Server error" });
   }
})

module.exports = router;