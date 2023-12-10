const createHttpError = require("http-errors");
const Product = require("../models/productModel");
const { successResponse } = require("./responseHandler");
const slugify = require('slugify');
const handleCreateProuct =async(req,res,next)=>{
    try {
        const {name,description,price,quantity,sold,shipping,category} = req.body;
        const productExists = await Product.exists({name});
        // console.log(productExists)
        const image = req.file.path
        if(productExists){
            throw createHttpError(409,'Product whit this name already exists ')
        }
        const product = await Product.create({
            name:name,
            slug: slugify(name),
            description:description,
            price:price,
            quantity:quantity,
            shipping:shipping,
            sold:sold,
            image:image,
            category:category
        })
        return successResponse(res,{
            statusCode:200,
            message:'Product created successfully',
            payload:product
        })
    } catch (error) {
        next(error)
        
    }
}
const handleGetProducts=async(req,res,next)=>{
    try {
        const page = parseInt(req.query.page) ||1 ;
        const limit = parseInt(req.query.limit) || 6;

        const products =await Product.find({}).populate('category').skip((page-1)*limit).limit(limit).sort({createdAt:-1})
        if(!products) throw createHttpError(404,'No product found')
        const count = await Product.find({}).countDocuments()
        return successResponse(res,{
            statusCode:200,
            message:'Products fetched successfully',
            payload:{
                products,
                pagination:{
                    totalPages:Math.ceil(count/limit),
                    currentPage:page,
                    nextPage: page+1 ,
                    previousPage: page-1 >0 ? page-1:null,
                    totalNumberOfproduct:count,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

const handleGetProduct =async(req,res,next)=>{try {
    const {slug} = req.params;
    const product = await Product.findOne({slug}).populate('category')
   if(!product) throw createHttpError(404,`Product not found this ${slug}`)
    return successResponse(res,{
        statusCode:200,
        message:'returned single product',
        payload:product
    })
} catch (error) {
    next(error)
}}
const handleDeleteProduct=async(req,res,next)=>{try {
    const {slug} = req.params
 const delte= await Product.findOneAndDelete({slug})
 if(!delte)throw createHttpError(404,'Product is not delete by slug')
  return successResponse(res,{statusCode:200,message:'Product deleted successfully'})
} catch (error) {
    next(error)
}}
const handleUpdateProduct =async(req,res,next)=>{
    try {
        const {slug} = req.params;
        console.log(slug)
        const updateOptions =  {new :true,runValidators:true,context:'query'}
        const allowedFields = ['name','description','price','sold','quantity','shipping'];
        const updates ={}
        for(const key in req.body){
            if(allowedFields.includes(key)){
                updates[key] = req.body[key]
            }
        }
        const updateProduct = await Product.findOneAndUpdate({slug},updates,updateOptions)
        if(!updateProduct) throw createHttpError(404,'Product doest not update by slug')
        return successResponse(res,{statusCode:200,message:'updated successfully',payload:updateProduct})
    } catch (error) {
        next(error)
    }
}
module.exports = {handleCreateProuct,handleUpdateProduct,handleDeleteProduct,handleGetProduct,handleGetProducts}