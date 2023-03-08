const exp = require('constants')
const { response } = require('express')
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const{errorHandler} = require('./Middleware/goalMiddleware')
const port = process.env.PORT 
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./Routes/goalRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))
app.use(errorHandler)
app.listen(port, () => console.log('Server started on port: '+port))

