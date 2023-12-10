 const express = require('express');
const { getUsers,getUserById,deleletUserById,handleForgetPassword ,handleUpdatePassword,handleResetPassword,processRegister,handleManageUserStatusById,updateUserById,activateUserAccount} = require('../controllers/userController');
const uploadUserImage = require('../middleware/uploadImage');
const { validateUserRegistion, validateUserPassword, validateUserForgetPassword, validateUserResetPassword } = require('../validators/auth');
const runValidation = require('../validators');
const { isLoggedIn, isLoggedOut, isAdmin } = require('../middleware/auth');
 const userRouter = express.Router()

 userRouter.post('/process-resigter',uploadUserImage.single('image'),isLoggedOut,validateUserRegistion,runValidation,processRegister)
 userRouter.post('/verify',isLoggedOut,activateUserAccount)
 userRouter.get('/',isLoggedIn,isAdmin,getUsers);
 userRouter.post('/forget-password',validateUserForgetPassword,runValidation,handleForgetPassword)
 userRouter.put('/reset-password',validateUserResetPassword,runValidation,handleResetPassword) 

 userRouter.get('/:id([0-9a-fA-F]{24})',isLoggedIn,getUserById);
 userRouter.delete('/:id([0-9a-fA-F]{24})',isLoggedIn,deleletUserById);
 userRouter.put('/:id',uploadUserImage.single('image'),isLoggedIn,updateUserById);
 userRouter.put('/manage-user/:id([0-9a-fA-F]{24})',isLoggedIn,isAdmin,handleManageUserStatusById)
  userRouter.put('/update-password/:id([0-9a-fA-F]{24})',validateUserPassword,runValidation,isLoggedIn,handleUpdatePassword)

 module.exports = userRouter;