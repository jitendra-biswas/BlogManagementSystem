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
    password:hashedPassword
   })


   res.status(201).json({
    message:"User Created Successfully",
    user
   })

}

async function login(req,res){
   const {email,password} = req.body

   const user =await userModel.findOne({email});
   if(!user){
    return res.status(401).json({message:"Invalid username or password"});
   }

   const isValidPassword =await bcrypt.compare(password,user.password);
   if(!isValidPassword){
    return res.status(401).json({message:"Invalid username or password"});
   }

   const token = await jwt.sign({
    id:user._id
   },process.env.JWT_SECRET)

   res.cookie(token);

   res.status(201).json({message:"Login Successfully"})
}

module.exports = {registerUser,login}