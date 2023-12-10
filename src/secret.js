require('dotenv').config();
const port = process.env.SERVER_PORT || 3000;
const MongodbURL = process.env.MONGODB_ATLAS_URL;
const defaultImagePathforProduct = process.env.DEFAUL_USER_IMAGE_PATH || 'public/images/products/towsif.jpg'

const defaultImagePath = process.env.DEFAUL_USER_IMAGE_PATH || 'public/images/users/screen.png'
const jwtActivationKey=process.env.JWT_ACTIVATION_KEY || kjdflkdjfodijflkd 
const jwtAccessKey=process.env.JWT_ACCESS_KEY || dfdfsssssssssssss 
const jwtResetKey=process.env.JWT_RESET_KEY || dfdfsssssssssssss 

const jwtRefreshKey=process.env.JWT_REFRESH_KEY || ddfkdjfsdijfaldkjfodijf
const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clinetUrl=process.env.CLIENT_URL
 const Max_FILE_SIZE = Number(process.env.Max_FILE_SIZE )|| 2097152  
 const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES|| ['jpg','jpeg','png']
module.exports = {
    port,
    MongodbURL,jwtResetKey,
    jwtAccessKey,
    defaultImagePathforProduct,
    defaultImagePath,ALLOWED_FILE_TYPES,jwtRefreshKey,
    jwtActivationKey,smtpUserName,smtpPassword,clinetUrl,Max_FILE_SIZE
}