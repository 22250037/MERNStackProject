const asyncHandler = require('express-async-handler')
const Goal = require('../Model/goalModel')
const User = require('../Model/userModel')
const { use } = require('../Routes/goalRoutes')
//Get goals 
//route = GET /api/goals
//access = private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

//Set goals 
//route = POST /api/goals
//access = private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    } 

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

//Update goals 
//route = PUT /api/goals/:id
//access = private
const updateGoals = asyncHandler(async (req, res) => {


const goal = await Goal.findById(req.params.id)

if(!goal){
    res.status(400)
    throw new Error('Goal Not Found')
}

const user = await Goal.findByIdAndUpdate(req.user.id)

//Check user
if(!user){
    res.status(401)
    throw new Error('User not found')
}

//Check if login user matches goal user
if(goal.user.toString() != user.id){
    res.status(401)
    throw new Error('User not Authorized')
}

const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
})
res.status(200).json(updatedGoal)

})

//delete goals 
//route = DELETE /api/goals/:id
//access = private
const deleteGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

if(!goal){
    res.status(400)
    throw new Error('Goal Not Found')
}

const user = await Goal.findByIdAndUpdate(req.user.id)

//Check user
if(!user){
    res.status(401)
    throw new Error('User not found')
}

//Check if login user matches goal user
if(goal.user.toString() != user.id){
    res.status(401)
    throw new Error('User not Authorized')
}

const deleteGoal = await Goal.findByIdAndRemove(req.params.id)
    res.status(200).json(deleteGoal)
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}