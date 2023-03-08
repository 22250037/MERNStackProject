const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : [true, 'Please add a name']
    },

    email:{
        type : String,
        required : [true, 'Please add email address']
    },

    password:{
        type : String,
        required : [true, 'Enter password']
    },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)