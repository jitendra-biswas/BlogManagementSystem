const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model')

async function validateUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findOne({email:decoded.email})

    res.status(201).json({
        message:"Success",
        user
    })

    next();
}

module.exports = validateUser;