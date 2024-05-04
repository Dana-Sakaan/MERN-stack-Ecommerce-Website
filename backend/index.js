const express = require("express");
const cors = require("cors");
const DB = require("./database").connectDb;
require("dotenv").config();
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
const {admin} = require("./middlware/auth")

const app = express();
DB();

app.use(cors())
app.use(express.json());


app.use("/api/products", productRoutes )
app.use("/api/user", userRoutes )
app.use("/api/adminside", adminRoutes)




app.listen(5000 ,()=>{
   console.log(`App is running on port 5000`)
})

