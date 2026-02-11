const express = require("express");
const commentSchema = require("../model/comment.model")

const router = express.Router();


router.post("/postComment",  (req,res)=>{
    const {pageID, name,description} = req.body;

     commentSchema.create({
      pageID,
        name,
        description
     })
})

router.get("/getComment/:pageID", async (req,res)=>{
   try {
    const comments =  await commentSchema.find({pageID});
   res.json({comments});
   } catch (error) {
    res.status(500).json({message:"server error"})
   }
})

module.exports = router;