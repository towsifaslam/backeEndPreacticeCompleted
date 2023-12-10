const  mongoose = require('mongoose')
const { MongodbURL } = require('../secret')
const logger = require('../controllers/logger')
 
 
 async function  connectToDatabase(){
     
 try {

  await mongoose.connect(MongodbURL)

     console.log("Connect to Mongodb at last")
 } catch (error) {
    logger.log('error',`Error conneting to mongoDb atlas retry `)
   

}}

module.exports = connectToDatabase;