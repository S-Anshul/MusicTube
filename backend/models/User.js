const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img: {
        type: String,
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribedUser:{
        type:[String],
        unique: true,
    },
},
{timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)