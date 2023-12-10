const express = require('express');
const { handleCategory,handleGetCategories,handleDeleteCategory,handleUpdateCategory,handleGetCategoriy} = require('../controllers/categoryController');
const { validateCategory } = require('../validators/category');
const runValidation = require('../validators');
const { isAdmin, isLoggedIn } = require('../middleware/auth');
 
const categoryRouter = express.Router()

categoryRouter.post('/',validateCategory,runValidation,isLoggedIn,isAdmin,handleCategory)
categoryRouter.get('/',handleGetCategories)
categoryRouter.get('/:slug',handleGetCategoriy)
categoryRouter.put('/:slug',handleUpdateCategory)
categoryRouter.delete('/:slug',isLoggedIn,isAdmin,handleDeleteCategory)




module.exports = categoryRouter; 