const {model,Schema} = require('mongoose')

const categorySchem = new Schema({
  name:{
    type:String,
    required:[true,'Category name is required'],
    trim:true,
    unique:true,
    minlength:[3,'The length of nam can be minimum 3 charecters'],
    maxlength:[31,'the length of name can be maximum 31 characters']
  },
  slug:{
    type:String,
    required:[true,'Category slug is required'],
    lowercase:true,
    unique:true,
  }
},{timestamps:true})

const Category = model('Category',categorySchem)
module.exports = Category;