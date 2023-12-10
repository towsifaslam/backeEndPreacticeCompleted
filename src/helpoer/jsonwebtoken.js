const jwt = require('jsonwebtoken')
const createJsonWebToken = (payload,secretKey,expiresIn)=>{
 
   try {
    const token = jwt.sign(payload,secretKey,{expiresIn})
    return token
   } catch (error) {
    console.log(error)
   }
}
module.exports = {createJsonWebToken}; 