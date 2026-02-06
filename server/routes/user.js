require("dotenv").config();
const express = require("express");
const router = express.Router();


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const DefaultEmail = process.env.Email;
    const DefaultPassword = process.env.Password;
     
    if (email == DefaultEmail && password == DefaultPassword) {
      res.status(200).json({message:"success", success:true});
    }
    else{
    res.status(401).json({ success: false});
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
