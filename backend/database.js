const mongoose = require("mongoose")




exports.connectDb = async ()=>{
   try {
      await mongoose.connect(process.env.MONGOURI)
      console.log("Mongo db connected")
   } catch (error) {
      console.log(error)
      process.exit(1)
   }

}
