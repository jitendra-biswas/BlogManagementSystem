const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  profileImage:{
    type: String
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    trim:true
  },
  bio: {
    type: String,
    trim: true
  }
});


const user = mongoose.model("user", userSchema);

module.exports = user;
