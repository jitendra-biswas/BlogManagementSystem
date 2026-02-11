const userModel = require('../model/user.model');
const bcrypt = require('bcryptjs');

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

module.exports = {registerUser}