const {validationResult} = require('express-validator')
const { errorResponse } = require('../controllers/responseHandler')

const runValidation  = async(req,res,next)=>{
    try {
         const errors = validationResult(req)
         if(!errors.isEmpty()){
            
            return errorResponse(res,{statusCode:402,message:errors.array()[0].msg})
         }
         return next()
    } catch (error) {
        return next(error)
    }
}
module.exports = runValidation