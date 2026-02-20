require("dotenv").config();
const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.controller')


router.post("/register",authController.registerUser)
router.post("/login",authController.login)
router.get("/checkToken",authController.checkToken)
router.get("/signOut",authController.signOut)
router.get("/getUsers",authController.getUsers)

module.exports = router;
