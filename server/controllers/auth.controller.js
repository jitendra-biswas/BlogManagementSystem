const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

async function registerUser(req,res){
   const {username,email,password} = req.body;

   const isUserAlreadyExist = await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
   })

   if(isUserAlreadyExist){
    return res.status(401).json({message:"User already exist"})
   }

   const hashedPassword = await bcrypt.hash(password,10);

   const user = await userModel.create({
    username,
    email,
    password:hashedPassword,
    handle: "@"+ username
   })


   res.status(201).json({
    message:"success",
    user
   })

}

async function login(req,res){
   const {email,password} = req.body

   let user = await userModel.findOne({email});

   const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
   const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

   // If not found in DB, but matches default admin from env, create/fetch admin user.
   if(!user){
     if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
       const hashedDefault = await bcrypt.hash(ADMIN_PASSWORD, 10);
       user = await userModel.findOne({email: ADMIN_EMAIL});
       if(!user){
         user = await userModel.create({
          username: ADMIN_USERNAME,
          email: ADMIN_EMAIL,
          password: hashedDefault,
          handle: "@" + ADMIN_USERNAME,
          isAdmin: true
         });
       }
     } else {
       return res.status(401).json({message:"Invalid username or password"});
     }
   }

   const isValidPassword = await bcrypt.compare(password,user.password);
   if(!isValidPassword){
    return res.status(401).json({message:"Invalid username or password"});
   }

   const token = await jwt.sign({
    email
   },process.env.JWT_SECRET)

   res.cookie("token", token, {
     httpOnly: true,
     maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie valid for 7 days
     sameSite: "lax"
   });

   res.status(201).json({message:"success"})
}

async function getUsers(req,res){
 try {
   const token = req.cookies.token;
   if(!token){
      return res.status(401).json({message:"Invalid token"})
   }
   const decoded = jwt.verify(token,process.env.JWT_SECRET);
   const user = await userModel.findOne({email:decoded.email});

   res.status(201).json({user})
   
 } catch (error) {
   console.log(error)
 }

}

async function signOut(req,res){
   res.clearCookie("token",{
      httpOnly: true,
   });
  res.send({ message: "success" });
}

async function checkToken(req,res){
   const token = req.cookies.token;
   if(!token){
      return res.status(401).json({message:"Token is not available"})
   }
   const decoded = jwt.verify(token,process.env.JWT_SECRET);
   const user = await userModel.findOne({email:decoded.email});
   
   res.status(201).json({message:"success", isAdmin: user?.isAdmin || false});
}

module.exports = {registerUser,login,checkToken,signOut,getUsers}