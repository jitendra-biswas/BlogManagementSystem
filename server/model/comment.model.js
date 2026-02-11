const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    pageID:{
      type: mongoose.Schema.Types.ObjectId,
      trim:true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
