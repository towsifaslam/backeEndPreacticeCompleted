const multer = require('multer')
const path = require('path')
 
const createHttpError = require('http-errors')
const { UPLOAD_USER_IMG_DIRECTORY, ALLOWED_FILE_TYPES, Max_FILE_SIZE } = require('../config')
  
const userStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,UPLOAD_USER_IMG_DIRECTORY)
    },
    filename: function(req,file,cb){
         const extname = path.extname(file.originalname)
         console.log(file.originalname)
      cb(null, Date.now()+'-'+file.originalname.replace(extname,"")+extname)
    }
})
const fileFilter = (req,file,cb)=>{
    const extname = path.extname(file.originalname);
    if(!ALLOWED_FILE_TYPES.includes(extname.substring(1))){
 
     return cb(new Error('Filte type not allowed'),false)
    }
   cb(null,true)
}
const uploadUserImage = multer({storage:userStorage,limits:{fileSize:Max_FILE_SIZE},fileFilter})
module.exports = uploadUserImage;