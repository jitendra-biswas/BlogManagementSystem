const mongoose = require("mongoose");

const blogData = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {  // add this field for storing ImageKit URL
    type: String,
    default: null
  },
  
});

const blog = mongoose.model("blogData", blogData);

module.exports = blog;
