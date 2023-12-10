const {Schema,model} = require('mongoose')
const { defaultImagePathforProduct } = require('../secret')

const productShema = new Schema({
    // name , slug , descriptions,prices,quantity,sold,shiping,image
    name:{
        type:String,
        required:[true,'Product name is requird'],
        trim:true,
        minlength:[3,'The length of product name can be mimum 3 charaters'],
        maxlength:[150,'The length of product name can be maximum 150 charecters']
    },
    slug:{
        type:String,
       required:[true,'prduct slug is requird'],
       lowercase:true,
       unique:true,
    },
    description:{
        type:String,
        required:[true,'Prodcut description is requird'],
        trim:true,
        minlength:[3,'The length of Product description cab be minimum 3 charecters']
        
    },
    price:{
        type:Number,
        required:[true,'Product Price is required'],
        trim:true,
        validate:{
            validator:(value)=> value>0,
           
            message:(props)=>
                `${props.value} is not a valid price! price must be greater then 0`
        
        }
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is requird'],
        trim:true,
        validate:{
            validator:(v)=>v>0,
            message:(props)=>
              `${props.value}is not a valid quanity ! quantity must be greater then 0`
        }
    },
    sold:{
        type:String,
        required:[true,'sold quantity is required'],
        trim:true,
        default:0,
        validate:{
            validator:(v)=>v>0,
            message:(props)=>
            `${props.value} is not a valid sold ! sold muste be grater then 0`
        }
    },
    shipping:{
        type:Number,
        default:0 // shipping freee 0 or paid somthing amount
    },
    image:{
        type:String,
        default:defaultImagePathforProduct
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
})
const Product = model('Product',productShema)
module.exports = Product;