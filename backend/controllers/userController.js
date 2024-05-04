const User = require("../models/usermodel");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const promisfy = require("util")

//jwt token
const signToken = (id)=>{
   return jwt.sign({id, }, process.env.JWTSECRET, {expiresIn: process.env.JWTEXPIRATION})
}

const createSendToken = (user,statusCode,res)=>{
   const token = signToken(user._id);

   res.status(statusCode).json({
      status: "success",
      token,
      data:{user}
   })
}

//signup function
const signup = async (req,res)=>{
   try { 

      if(!validator.isEmail(req.body["email"])){ //if the email is a not valid email
         return res.status(400).json({message:"email is not valid"})
      }
      const checkUserExistence = await User.findOne({email:req.body["email"]})
      if(checkUserExistence){
         return res.status(409).json({message: "user already exists"})
      }

      const newUser = await User.create({
         name: req.body["name"],
         email:req.body["email"],
         password:req.body["password"]
      })
      createSendToken(newUser,201,res)
   } catch (error) {
      res.status(400).json({message: error});
   }
}

//login function

const login = async (req,res)=>{
   
   try{const{email,password}= req.body;
      const user = await User.findOne({email:email})
  
   if(!user || !(await user.checkPassword(password, user.password))){
      return res.status(401).json({message: "Invalid Credentials"})
   }
   
   createSendToken(user,200,res);
}
catch(error){
   console.log(error)
   return res.status(401).json(error)
}
}





//   createSendToken(user,200,res);









module.exports = {login, signup}