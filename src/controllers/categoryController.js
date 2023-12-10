const createHttpError = require("http-errors")
const Category = require("../models/categoryModel")
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../services/categoryService")
const { successResponse } = require("./responseHandler")
const slugify = require('slugify')
const { findWithId } = require("../services/findItem")
const handleCategory = async(req,res,next)=>{
    try {
        const {name} = req.body
       
        const newCategory =await createCategory(name)
      return successResponse(res,{statusCode:200,message:" category was created successfully",payload:newCategory})
    } catch (error) {
        next(error)
    }
}
const handleGetCategories = async(req,res,next)=>{
    try {
        
       const category = await  getCategories()
           if(!category || category.length === 0){
        throw createHttpError(404,'Category not found')
       }
      return successResponse(res,{statusCode:200,message:" category was created successfully",payload:category})
    } catch (error) {
        next(error)
    }
}
const handleGetCategoriy = async(req,res,next)=>{
    try {
         const {slug} = req.params;
     const category =await getCategory(slug)
           if(!category || category.length === 0){
        throw createHttpError(404,'Category not found')
       }
      return successResponse(res,{statusCode:200,message:" category was created successfully",payload:category})
    } catch (error) {
        next(error)
    }
}
const handleUpdateCategory = async(req,res,next)=>{ 
    try {
        const {slug} = req.params;
         const {name} = req.body;
         
       const update = await updateCategory(slug,name)
       if(!update){
        throw createHttpError(404,'Category not found')
       }
        return successResponse(res,{statusCode:200,message:'update successfullly',payload:update})
    } catch (error) {
        
    }
}
const handleDeleteCategory = async(req,res,next)=>{

try {
    const {slug} = req.params
   const result =  await deleteCategory(slug)
   if(!result){
    throw createHttpError(404,'No category found')
   }
    return successResponse(res,{statusCode:200,message:'Category deleted succefully'})
} catch (error) {
    next(error)
}   
}
module.exports = {handleCategory,handleDeleteCategory,handleGetCategories,handleGetCategoriy,handleUpdateCategory}