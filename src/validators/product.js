const {body} = require('express-validator')
const validateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is requird')
        .isLength({min:3,max:150})
        .withMessage('Product name should be least 3-150 characters long'),
        body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is requird')
        .isLength({min:3})
        .withMessage("descrip should be at least 3 charecters long"),
        body('price')
        .trim()
        .notEmpty()
        .withMessage('Price is required ')
        .isFloat({min:0})
        .withMessage('price must be postive number'),
        body('quantity')
        .trim()
        .notEmpty()
        .withMessage('quantity is requird'),
        body('category')
        .trim()
        .notEmpty()
        .withMessage('category is requird'),
        body('quantity')
        .trim()
        .notEmpty()
        .withMessage('quantity is requird')
        .isInt({min:1})
        .withMessage('Quantity must be a postive integer')
    ]

module.exports = {
    validateProduct
}