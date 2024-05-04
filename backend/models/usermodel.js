const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
   name:{
      type: String,
      required: true,
      trim:true
   },
   email:{
      type: String,
      required: true,
      trim:true,
   },
   password:{
      type: String,
      required: true,
      trim:true,
   },
   passwordChangedAt: Date,
   isAdmin:{
      type: Boolean,
      default: false
   },
   orders:[{
         type: Schema.Types.ObjectId,
         ref: "Order"
   }]

},
{
   timestamps:true,
});

//hashing passwords 
//any changes in the password will triger this middleware that will hash the password
UserSchema.pre("save", async function(next){
   try {
      if(!this.isModified("password")){ // if the password is not modified
         return next(); // next middleware will continue to the next middleware
      }
      this.password = await bcrypt.hash(this.password,12)
      //12 is the salt(number of hashing rounds)
   } catch (error) {
      console.log(error);
   }
})


UserSchema.methods.checkPassword = async function(candidatePassword,userPassword){
   //candidate pass is the password sent by the user and user pass is the one in the database 
   // the candidate pass will be hashed on save and this hashed pass will be compared by the hashed one //in the database
   
   return await bcrypt.compare(candidatePassword , userPassword)
}

UserSchema.methods.passwordChangedAfterToken  = function(JWTTimestamp){
   if(this.passwordChangedAt){
      const passwordChangedTime = parseInt(passwordChangedAt.getTime()/1000 , 10);
      return passwordChangedTime> JWTTimestamp;
   }
   return false;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
