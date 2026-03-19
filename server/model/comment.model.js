const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    pageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      trim: true,
    },
    userId: {  // ✅ new field: who wrote the comment
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
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
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;