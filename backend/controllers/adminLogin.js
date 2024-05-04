const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const signToken = (admin)=>{
   return jwt.sign({admin}, process.env.JWTSECRET, {expiresIn: process.env.JWTEXPIRATION})
}
const createSendToken = (user)=>{
   const token = signToken(user.isAdmin);

   /*res.status(statusCode).json({
      status: "success",
      token,
      data:{user}
   })*/
}

const adminLogin = async (req,res)=>{
   
   try{const{email,password}= req.body;

      const user = await User.findOne({email:email})
  
   if(!user || !(await user.checkPassword(password, user.password))){
      return res.status(401).json({message: "Invalid Credentials"})
   }

   if(user && user.isAdmin){
      createSendToken(user);
      res.status(200).json(success = true)
   }else{
      res.status(403).json(success = false)
   }
}
catch(error){
   console.log(error)
}
}

module.exports = {adminLogin}