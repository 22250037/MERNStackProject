const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID;

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')
const protect = asyncHandler(async(req, res, next)=> {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
console.log(JSON.stringify(decoded) +'Aish')
            //Get user from token
            const decodedJSON=JSON.stringify(decoded)
            req.User = await User.findById(ObjectId(decodedJSON.id)).select('-password')
            console.log(req.User)
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorization, No token')
    }
})

module.exports = { protect }