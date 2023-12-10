const {body} = require('express-validator')

const validateUserRegistion = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min:3,max:31})
        .withMessage('name should be at least 3-31 charecters long'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('emal is required')
        .isEmail()
        .withMessage('Invalide Email'),
  body('password')
        .trim()
        .notEmpty()
        .withMessage('password is required')
        .isLength({min:6})
        .withMessage('password should be at least 6 charecters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
        .withMessage(' at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters')
        ,    
   body('address')
        .trim()
        .notEmpty()
        .withMessage('address is required')
        .isLength({min:3})
        .withMessage('address should be at least 3 charecters long'),
  body('phone')
        .trim()
        .notEmpty()
        .withMessage('phone is required'),
    body('image')
       .optional().isString().withMessage('phone is required')    
            
]
const validateUserLogin = [
   
    body('email')
        .trim()
        .notEmpty()
        .withMessage('emal is required')
        .isEmail()
        .withMessage('Invalide Email'),
  body('password')
        .trim()
        .notEmpty()
        .withMessage('password is required')
        .isLength({min:6})
        .withMessage('password should be at least 6 charecters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
        .withMessage(' at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters')
        ,    
     
            
]

const validateUserPassword = [
   
    body('email')
        .trim()
        .notEmpty()
        .withMessage('emal is required')
        .isEmail()
        .withMessage('Invalide Email'),
  body('oldpassword')
        .trim()
        .notEmpty()
        .withMessage('oldpassword is required')
        .isLength({min:6})
        .withMessage('old password should be at least 6 charecters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
        .withMessage(' at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters'),  
body('newPassword')
        .trim()
        .notEmpty()
        .withMessage('newPassword is required')
        .isLength({min:6})
        .withMessage('newPassword should be at least 6 charecters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
        .withMessage(' at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters')
        ,  
        body('confirmPassword')
        .custom((value,{req})=>{
            if(value !== req.body.newPassword){
                throw new Error('Password did not match')
            }
            return true
        })
               
     
            
]
const validateUserForgetPassword = [
   
    body('email')
        .trim()
        .notEmpty()
        .withMessage('emal is required')
        .isEmail()
        .withMessage('Invalide Email'),
 
     
            
]
const validateUserResetPassword = [
   
    body('token')
        .trim()
        .notEmpty()
        .withMessage('token is required'),
       
  body('password')
        .trim()
        .notEmpty()
        .withMessage('oldpassword is required')
        .isLength({min:6})
        .withMessage('old password should be at least 6 charecters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
        .withMessage(' at least 8 characters must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number Can contain special characters'),  
 
               
     
            
]
module.exports = {validateUserRegistion,validateUserResetPassword,validateUserForgetPassword,validateUserLogin,validateUserPassword}