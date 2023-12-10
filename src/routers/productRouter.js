const express = require('express')
const productRouter = express.Router()
const { isAdmin, isLoggedIn } = require('../middleware/auth');

const upload = require('../middleware/uploadImage')
const { handleCreateProuct,handleDeleteProduct ,handleUpdateProduct,handleGetProducts,handleGetProduct} = require('../controllers/productController')
const { validateProduct } = require('../validators/product')
const runValidation = require('../validators')
productRouter.post('/',upload.single('image'),validateProduct,runValidation,handleCreateProuct)
productRouter.get('/',handleGetProducts)
productRouter.get('/:slug',handleGetProduct)
productRouter.delete('/:slug',isLoggedIn,isAdmin,handleDeleteProduct)
productRouter.put('/:slug',isLoggedIn,isAdmin,handleUpdateProduct)

module.exports = productRouter