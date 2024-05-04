const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel")
const {getAllProducts , getOneProduct, addProduct,updateProduct,deleteProduct, getCategoryProducts} = require("../controllers/productControllers.js");
const { isAdmin } = require("../middlware/auth.js");


//route to get all products in database(user)
router.get("/allToys", getAllProducts);

//get one product in a category(user)
router.get("/category/:_id" , getOneProduct);

//get productswith specific category(user)
router.get("/:category", getCategoryProducts)


module.exports = router;