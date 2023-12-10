const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require("../secret");
const isLoggedIn = async(req,res,next)=>{
    try {
        // console.log("towsif")
        const token = req.cookies.accessToken;
        // console.log(token)
         if(!token){ 
            throw createHttpError(401,'Access Token not fount')
         }
         const decoded = jwt.verify(token,jwtAccessKey) 
        //  console.log(decoded)
        if(!decoded){
            throw createHttpError(401,'Invalid Access Token pleas login again')
        }
         req.user = decoded.user
        //  console.log(req.user)
        next()
    } catch (error) {
        return next(error)
    }
}

const isLoggedOut = async(req,res,next)=>{
    try {
         const accessToken=req.cookies.accessToken;
         if(accessToken){
          try {
            const decoded = jwt.verify(accessToken,jwtAccessKey)
            if(decoded){
            throw createHttpError(401,'User is already logged in')
              
            }
          } catch (error) {
            throw error;
          }
         }
         next()
    } catch (error) {
       return next(error)
    }
}
const isAdmin =async(req,res,next)=>{
    // console.log(req.user)
    try {
        
        if(!req.user.isAdmin){
            throw createHttpError(403,'Forbidden you must be an admin')
        }
        next()
    } catch (error) {
        console.log("error",error)
        return next(error)
    }
}
module.exports = {isLoggedIn,isLoggedOut,isAdmin} 