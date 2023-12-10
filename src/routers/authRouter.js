const express = require('express')
const runValidation = require('../validators');
const { handleLogin ,handleLogout,handleRefreshToken,handleProdected} = require('../controllers/authController');
const { isLoggedOut, isLoggedIn } = require('../middleware/auth');
const { validateUserLogin } = require('../validators/auth');
 const authRouter = express.Router()

authRouter.post('/login',validateUserLogin,runValidation,isLoggedOut,handleLogin)
authRouter.post('/logout',isLoggedIn,handleLogout)
authRouter.get('/refresh-token',handleRefreshToken)
authRouter.get('/protected',handleProdected)


 module.exports = authRouter;