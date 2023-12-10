const createHttpError = require("http-errors")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const { successResponse } = require("./responseHandler")
const { createJsonWebToken } = require("../helpoer/jsonwebtoken")
const { jwtAccessKey, jwtRefreshKey } = require("../secret")
const jwt = require('jsonwebtoken')
const handleLogin =async(req,res,next)=>{
    try {
        //email , password , req.body
        const {email,password} = req.body
        //isExsits
        const user  = await User.findOne({email})

        if(!user){
            throw createHttpError(404,'user does not exist whtis this email , please register first')
        }
        //compare the password
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            throw createHttpError(401,'Email/password did not match')
        }
        //isBanned
        if(user.isBanned){
            throw createHttpError(404,'user is Banned pleas contack admin')
        }
        //token , cookie
        const accessToken = createJsonWebToken({user},jwtAccessKey,'10m')
        res.cookie('accessToken',accessToken,{
            maxAge:10*60*1000, // 15minutes
            httpOnly:true,
            // secure:true,
            sameSite:'none'
        })

        // refreshToken 
        const resfreshToken = createJsonWebToken({user},jwtRefreshKey,'7d')
       res.cookie('refreshToken',resfreshToken,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:'none'
       })
        //   console.log({token})
        return successResponse(res,{statusCode:200,message:'user login successfully',payload:user})
    } catch (error) {
        next(error)
    }
}
const handleLogout = async(req,res,next)=>{
    try {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return successResponse(res,{statusCode:201,message:'user logout succesfully'})
    } catch (error) {
        next(error)
    }
} 
const handleRefreshToken=async(req,res,next)=>{
try {
    const odlRefreshToken = req.cookies.refreshToken;
    // console.log(odlRefreshToken)
    const decoded = jwt.verify(odlRefreshToken,jwtRefreshKey)
    // console.log(decoded.user)
    if(!decoded){
        throw createHttpError(402,'Invalid refresh token')
    }
    const accessToken = createJsonWebToken(decoded.user,jwtAccessKey,'10m')
    res.cookie('accessToken',accessToken,{
        maxAge:10*60*1000,
        httpOnly:true,
        sameSite:'none'
    })
    return successResponse(res,{statusCode:200,message:'successfull you refresh token'})
} catch (error) {
    next(error)
}
}
const handleProdected =async(req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        // verify the old refshesh token 
         
        // console.log(accessToken)
        const decoded = jwt.verify(accessToken,jwtAccessKey);
        if(!decoded){
            throw createHttpError(402,'invalid refresh toke please login again')
        }
        return successResponse(res,{
            statusCode:200,
            message:'prodected resources accessed  successfully'
        })
         
    } catch (error) {
        
    }
}
module.exports = {handleLogin,handleLogout,handleRefreshToken,handleProdected}