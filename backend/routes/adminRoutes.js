const express = require("express")
const { addProduct, deleteProduct, updateProduct, saveOrder } = require("../controllers/productControllers")
const router = express.Router()
const {adminLogin} = require("../controllers/adminLogin")


router.post("/adminlogin", adminLogin)

router.post("/orders" , saveOrder)

router.post("/dashboard/addproduct", addProduct);

router.delete("/deleteproduct", deleteProduct)

router.put("/updateproduct", updateProduct);

module.exports = router