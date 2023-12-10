const data = require("../data")
const Product = require("../models/productModel")
const User = require("../models/userModel")

const seedUser = async(req,res,next)=>{
    try {
         await User.deleteMany({})
         const user = await User.insertMany(data.users)
         return res.status(201).json({message:'user allready insert ',user})  
    } catch (error) {
        next(error)
    }
}
const seedProducts= async(req,res,next)=>{
    try {
         await Product.deleteMany({})
         const products = await Product.insertMany(data.products)
         return res.status(201).json({message:'product allready insert ',products})  
    } catch (error) {
        next(error)
    }
}

module.exports = {seedUser,seedProducts} 