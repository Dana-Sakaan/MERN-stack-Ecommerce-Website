const jwt = require("jsonwebtoken");


const auth = (req,res, next)=>{
   const token = req.header("x-auth-token");

   if(!token){return res.status(401).json({message: "access denied"})};

   try {
      const secret = process.env.JWTSECRET;
      const user = jwt.verify(token, secret);

      req.user = user;

      next();
   } catch (error) {
      console.log(error);
   }
}

const isAdmin = (req, res, next) => {
   auth(req, res, () => {
      if (req.user.isAdmin) {
         next();
      } else {
         return res.status(403).json({ message: "access denied" })
      };
   })
}




const protect= async(req,res,next)=>{
   try {
      //check if token exist
      let token;
      if(req.headers.authorization && req.headers.authorization.startWith("Bearer")){
         token = req.headers.authorization.split(" ")[1];
      }
      if(!token){
         res.status(401).json({message: "you are not logged in"})
      }

      //token verification
      let decoded;
      try {
         decoded = await promisfy(jwt.verify)(token, process.env.JWTSECRET)
      } catch (error) {
         if(error.name === "JsonWebTokenError"){
            return res.status(401).json({message: "log in again"})
         }
         else if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "log in again"})
         }
      }


      //check if user still exists

      const currentuser = await  User.findById(decoded.id)
      if(!currentuser){
         return res.status(401).json({message:"user doesnt exist"});
      }

      //check if password changed after taking the token
      if(!currentuser.passwordChangedAfterToken(decoded.iat)){
         return res.status(401).json({message:"Your password has been changed log in again"});
      }

      req.user = currentuser;

      next();

   } catch (error) {
      console.log(error)
   }
}




// const admin = async (req,res,next)=>{
//    try {
     



//       //check if user exists in the request object and is an admin 
//       if(req.user && req.user.isAdmin === true){
//          next(); //proceed to next route if the user  is an admin
//       }else{
//          res.status(401).json({message: "unauthorized user"})
//       }
//    } catch (error) {
//       console.log(error)
//    }
// }







module.exports = {isAdmin, auth}