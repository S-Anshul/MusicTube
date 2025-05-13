const mongoose = require("mongoose")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res) =>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({...req.body, password: hash})

        await newUser.save()
        res.status(200).send("USer is created")

    }catch(err){
        res.status(404).send("Error")
    }
}

const signin = async (req, res) =>{
    try{
        const user = await User.findOne({name:req.body.name})
        if(!user){
            res.status(404).send("No user found")
        }

        const valid = await bcrypt.compare(req.body.password, user.password)
        if(!valid){ 
            res.status(400).send("Password incorrect")
        }

        const token = jwt.sign({id:user._id}, process.env.JWT) // token for verification of user

        res.cookie("access_token", token, {
            httpOnly:true // no third party will be able to use this cookie
        }).status(200).json(user)

    }catch(err){
        res.status(404).send("No user found")
        // console.log(err)
    }
}

module.exports = {signup, signin}