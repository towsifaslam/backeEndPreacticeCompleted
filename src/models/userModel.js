 const {Schema,model} = require('mongoose')
 const bcrypt = require('bcryptjs');
const { defaultImagePath } = require('../secret');
 const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
        trim:true,
        minlength:[3,'The length of user name can be minimum 3 characters'],
        maxlength:[31,'The length of user name can be maximum 31 characters']
    },
 email:{
        type:String,
        required:[true,'User email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:(value)=>{
                return /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gm.test(value);
            },
            message: 'Please Enter valid Email'
        }
    },
    password:{
        type:String,
        required:[true,'User password is required'],
        minlength:[6,'The length of password can be minimum 6 characters'],
        set:(v)=> bcrypt.hashSync(v,bcrypt.genSaltSync(10))
    },
    phone:{
   type:String,
    },
    image:{
        type:String,
        default:defaultImagePath
    },
    address:{
        type:String,
        required:[true,'User address is required']
    },
    address:{
        type:String,
        required:[true,'User phone is required']
    }, 
    isAdmin:{
        type:Boolean,
       default:false
    }, 
    isBanned:{
        type:Boolean,
       default:false
    }
 },{timestamps:true})
 const User = model('Users',userSchema)
 module.exports = User;