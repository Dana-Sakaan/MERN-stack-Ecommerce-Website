const Order = require("../models/Ordermodel");
const Product = require("../models/ProductModel");



//get all products (USER)
const getAllProducts = async (req, res)=>{
   try {
      const products = await Product.find({});
      res.status(200).json(products);
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}

//get one product (USER)
const getOneProduct = async (req,res)=>{
   try {
      const _id = req.params._id;
      console.log(_id)
      const product = await Product.findById(_id);
      
      if(!product){
         return res.status(404).json({message: "Product doesnt exist"})
      }

      res.status(200).json(product);
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}

//get products by category name (USER)

const getCategoryProducts = async (req,res)=>{
   try {
      const category = req.params.category;
      const products = await Product.find({category:category});
      res.status(200).json(products);
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}


//add product (ADMIN)
const addProduct = async (req,res)=>{
   try {
      const {imageUrls, name, description,category, price} = req.body
      const product = await Product.create({
         name,
         price,
         category,
         description,
         imageUrls
      }
      );
      res.status(200).json(product);
   } catch (error) {
      res.status(500).json({message: error.message})
   }
}

//update product (ADMIN)
const updateProduct = async (req,res)=>{
   try {
      const {id} = req.params;
       const product = await Product.findByIdAndUpdate(id,req.body);
       if(!product){
         return res.status(404).json({message: "product not found"});
       }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
   } catch (error) {
      
   }
}

//delete a product  (ADMIN)
const deleteProduct = async (req,res)=>{
   const {id} = req.params;
   const product = await Product.findByIdAndDelete(id);
   if(!product){
      return res.status(404).json({message:"product not found"})
   }
   res.status(200).json({message: "product is deleated"})
}



const saveOrder = async (req,res)=>{
   try {
      const order = await Order.create(req.body)
      console.log(order);
   } catch (error) {
      console.log(error)
   }
  
}



module.exports = {getAllProducts , getOneProduct, getCategoryProducts,addProduct, updateProduct, deleteProduct,saveOrder}