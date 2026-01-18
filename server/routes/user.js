require("dotenv").config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email_exist" });
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      await userModel.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "error" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "error" });
    }

    //Generate Token using JWT
    const token =  jwt.sign({
      userId : user._id,
      email: user.email,
      username: user.username
    },
    process.env.JWT_SECRET
  )

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,     
  sameSite: "lax",    // allow cross-port cookies
});


    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router