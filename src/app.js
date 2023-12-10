const express= require('express');
const bodyparser= require('body-parser')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const createError = require('http-errors')
const xssClean = require('xss-clean')
const rateLimit = require('express-rate-limit');
const seedRouter = require('./routers/seedRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');

const cookieParser = require('cookie-parser')
 
const { errorResponse } = require('./controllers/responseHandler');

 
// rate limit
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 20, // Limit each IP to 5 requests per `window` (here, per  minute).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false,
})
///////default middleware
app.use(cookieParser())
app.use(xssClean())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
// create me 
app.use(rateLimiter) 

app.get('/', (req, res) => {
  res.send('Hello, this is your API!');
});
app.use('/api/users',userRouter)
app.use('/api/seed',seedRouter)
app.use('/api/auth',authRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/products',productRouter)
app.use((req,res,next)=>{
  
   next(createError(404,'router not found'))
})

app.use((err,req,res,next)=>{
 
  // return res.status(err.status || 500).json({
  //   success:false,
  //   message: err.message
  // })
  return errorResponse(res,{statusCode:err.status,message:err.message})
})

 
module.exports = app  