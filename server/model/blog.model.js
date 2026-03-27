const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subTitle: {
      type: String,
      required: false,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    userId :{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      trim:true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    publishedAt: {
      type: Date,
      default: Date.now, // 👈 publish time
    },
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
