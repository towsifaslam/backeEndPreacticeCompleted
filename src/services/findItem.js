const createHttpError = require("http-errors")
const  mongoose = require("mongoose")
const findWithId = async(Model,id,option={})=>{
     try {
        const item = await Model.findById(id,option)
        if(!item) {throw createHttpError(404,`${Model.modelName} does not exist with this id`)}
        return item
     } catch (error) {
        if(error instanceof mongoose.Error){
            throw(createHttpError(404,'Invalid item id'))
          }
          throw error
     }
}
module.exports = {findWithId}