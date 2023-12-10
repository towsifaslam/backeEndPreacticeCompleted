const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { createJsonWebToken } = require("../helpoer/jsonwebtoken");
const { jwtResetKey, clinetUrl } = require("../secret");
const emailWithNodmailer = require("../helpoer/email");
 

const findUsers = async(search,limit,page)=>{
  try {
    const searchRegExp = new RegExp('.*'+search+'.*','i')
    const filter = {
     isAdmin:{$ne:true},
     $or:[
       {name:{$regex:searchRegExp}},
       {email:{$regex:searchRegExp}},
       {phone:{$regex:searchRegExp}}
     ]
    }
    const options = {password:0}
   const users = await User.find(filter,options).limit(limit).skip((page-1)*limit)
   const count = await User.find(filter).countDocuments();
   if(!users) throw createHttpError(404,'no users found')

   return{
    users,
    pagination:{
               totalPages: Math.ceil(count/limit),
               currentPage:page,
               previousPage: page -1 > 0 ? page-1:null ,
               nextPage: page+1 <=Math.ceil(count/limit)?page+1:null
             }

   }
  } catch (error) {
    throw error
  }

 
}

 
const handleUserAction =async(userId,action)=>{
    try {
        let updateds;
        let msg;
        if(action === 'ban'){
          updateds ={isBanned:true}
          msg='user banned successfully'
        }else if(action === 'unban'){
          updateds ={isBanned:false}
          msg='user unbanned successfully'
        }else{
          throw createHttpError(400,'Invalid action , use ban or unban')
        }
        console.log(updateds,msg)
        const updateOptions = {new :true,runValidators:true,context:'query'}
    
        const updateUser = await User.findByIdAndUpdate(userId, updateds,updateOptions).select('-password')
        if(!updateUser){
          throw createHttpError(404,`User was not ${msg} successfully`)
        }
        return msg

    } catch (error) {
         throw (error)
    }
}

const forgetPassword =async(email)=>{
  try {
    const userData = await User.findOne({email}) 
    if(!userData){
      throw createHttpError(404,'Email is incorrect or you have not verified you email address')
    }
    // create token 
    const token = createJsonWebToken({email},jwtResetKey, '10m')
    const emailData = {
      email,
      subject: 'Reset passwod Email',
      htlm: `
       <h2>Hello ${userData.name}</h2>
       <p>
        please click here to <a href="${clinetUrl}/api/users/reset-password/${token}">Reset your Password</a>
       </p>
      `
     }
    // send email with nodemaier 
    try {
      await emailWithNodmailer(emailData)
    } catch (error) {
      next(createHttpError(500,'Faild to send Reset password to  email'))
      return;
    }
    return token;
  } catch (error) {
    throw error
  }
}

module.exports = {handleUserAction,findUsers,forgetPassword}