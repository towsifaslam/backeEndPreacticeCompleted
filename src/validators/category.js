const {body} = require('express-validator')

const validateCategory = [

    body('name')
     .trim()
     .notEmpty()
     .withMessage('Category Name is required ')
     .isLength({min:3 })
     .withMessage('Category name Should be at least 3-31 characters long')
]

module.exports ={
    validateCategory
}