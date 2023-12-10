const createHttpError = require("http-errors")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { successResponse } = require("./responseHandler")
const {findWithId} = require("../services/findItem")
const { deleteImage } = require("../helpoer/deletedImage")
const { createJsonWebToken } = require("../helpoer/jsonwebtoken")
const { jwtActivationKey, clinetUrl, jwtResetKey } = require("../secret")
const emailWithNodmailer = require("../helpoer/email")
const { handleUserAction, findUsers, forgetPassword } = require("../services/userService")

 const getUsers = async(req,res,next)=>{
  try {
     const search = req.query.search || ''
     const page = Number(req.query.page )|| 1
     const limit = Number(req.query.limit )|| 5
     const {users,pagination} =await findUsers(search,limit,page)
     return successResponse(res,{statusCode:200,message:'user were returned',payload:{
      users,
      pagination:pagination
    }})
  } catch (error) {
    next(error)
  }
 }
 const getUserById = async(req,res,next)=>{
  try {
    // console.log('towsif',req.body.userId)
    const id = req.params.id;
    const option = {password:0}
    const user =await findWithId(User,id,option)

    return successResponse(res,{statusCode:202,message:'get user by id',payload:user})
    
  } catch (error) {
    
    next(error)
  }
 }
 const deleletUserById =async(req,res,next)=>{
  try { 
     const id = req.params.id;
     const option = {password : 0};
     const user = await findWithId(User,id,option) 
     if(!user) throw createHttpError(404,'user does not exist with this id') 
     const userImagePath = user.image;
      console.log(userImagePath)
    await deleteImage(userImagePath)
    await User.findByIdAndDelete({_id:id,isAdmin:false})
     return successResponse(res,{statusCode:201,message:'user was deleted succefully'})
  } catch (error) {
    next(error)
  }
 }
 const processRegister = async(req,res,next)=>{
  try {
    const {name,email,password,phone,address}=req.body
   const newUser = {
    name,
    email,
    password, 
    phone,
    address,

   }
    // const image = req.filte;
    // if(!image){
    //   throw createHttpError(404,'Image file is required')
    // }
    // if(image){
    //   throw createHttpError(400,'Image filet is required')
    // }
   
    const userExists = await User.exists({email:email}) 
    if(userExists){
     next(createHttpError(409,'user already exist please login'))
    }
    // crate jwt
    const image = req.file.path
   
    const token =createJsonWebToken({
      name,
      email,
      password, 
      phone,
      address,
      image:image
  
     },jwtActivationKey,'10m')
     // prepare email
     const emailData = {
      email,
      subject: 'Account Activation Email',
      htlm: `
       <h2>Hello ${name}</h2>
       <p>
        please click here to <a href="${clinetUrl}/api/users/activate/${token}">activate your account</a>
       </p>
      `
     }
     //send email with nodemailer
     try {
      await  emailWithNodmailer(emailData)
     } catch (error) {
      next(createHttpError(404,'fail to send verifaction email'))
     }
    return successResponse(res,{statusCode:200,message:'user was created successfully',payload:token})
  } catch (error) {
    
  }
 }

 const activateUserAccount = async(req,res,next)=>{
  try {
    const token = req.body.token
    if(!token) throw createHttpError(404,'token not found')
   const decoded =  jwt.verify(token,jwtActivationKey)
   const userExists = await User.exists({email:decoded.email})
 if(userExists){
  throw createHttpError(409,'Email already exist')
 }
 const user = await User.create(decoded)


 
    return successResponse(res,{statusCode:201,message:'user was registerd successfully',payload:user})
  } catch (error) {
    next(error)
    
  }
 }
 const updateUserById = async(req,res,next)=>{
     try {
       const userId = req.params.id;
       const option = {password : 0};
       await findWithId(User,userId,option) 
       const updateOptions = {new :true,runValidators:true,context:'query'}
       let updates = {};
       // name email,password,phone image address
        for(let key in req.body){
          if(['name','password','phone','address'].includes(key)){
            updates[key] = req.body[key]
          }
        }

       const image = req.file;
       if(image){
        if(image.size>1024*1024*2){
          throw createHttpError(400,'file to lagrge it must be less then 2 mb')
        }
        updates.image = image
       }
       delete updates.email; 
       const updatedUser = await User.findByIdAndUpdate(userId,updates,updateOptions).select('-password')
       if(!updatedUser){
        throw createHttpError(404,'User with this id does not exists ')
       }
       return successResponse(res,{statusCode:200,message:'user was updated successfully',payload:updatedUser})

     } catch (error) {
             next(error)      
     }
 }
 const handleManageUserStatusById=async(req,res,next)=>{
  try {
    const userId = req.params.id;
      
    await findWithId(User,userId)
    const action = req.body.action;
  const successMessage =  await handleUserAction(userId,action)
   
    return successResponse(res,{statusCode:202,message: successMessage})
  } catch (error) {
    
  }
 }
  const handleUpdatePassword=async(req,res,next)=>{
    try {
      const {email,oldpassword,newPassword,confirmPassword} = req.body
      const userId = req.params.id;

    const user =  await findWithId(User,userId)
    const isPassword = await bcrypt.compare(oldpassword,user.password)
 
    if(!isPassword){
      throw createHttpError(402,'old password did not match')
    }
    // const filter = {userId}
    // const update = {$set:{password:newPassword}}
    // const updateOptions = {new:true}
    const updateUser = await User.findByIdAndUpdate(userId,{password:newPassword},{new:true})
    if(!updateUser){
      throw createHttpError(400,'user pass not updated')
    }
    return successResponse(res,{statusCode:200,message:'user password was update successfully',payload:updateUser})
    } catch (error) {
      next(error)
    }
  }
  const handleForgetPassword=async(req,res,next)=>{
    try {
      const {email} = req.body;
      const token =await forgetPassword(email)
      return successResponse(res,{statusCode:200,message:`please go to you ${email} for reseting the password`,payload:token})
    } catch (error) {
      next(error)
    }
  }
  const handleResetPassword=async(req,res,next)=>{
    try {
      const {token,password} =req.body
      // console.log(token,password)
      const decoded = jwt.verify(token,jwtResetKey)
      // console.log(decoded) 
      if(!decoded){
        throw createHttpError(400,'Invali or exired token')
      }
      const filter = {email:decoded.email}
      const update = {password:password}; 
      const option = {new:true};
      const updateUser =  await User.findOneAndUpdate(filter,update,option);
      console.log(updateUser) 
      if(!updateUser){
        throw createHttpError(404,"password resete faild")
      }
      return successResponse(res,{
        statusCode:200,
        message:'password reset successfully',
        payload:{}
      })
    } catch (error) {
      
    }
  }
 module.exports = {getUsers,handleUpdatePassword,handleForgetPassword,handleManageUserStatusById,updateUserById,getUserById,deleletUserById,processRegister,activateUserAccount,handleResetPassword}