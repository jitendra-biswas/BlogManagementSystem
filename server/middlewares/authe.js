const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message:'unauthorized'
        })
    }

    try{
       const decode = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(error){

    }
}