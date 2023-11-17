const mongoose = require("mongoose");
const validator= require('validator')

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, "Name cannot exceed 50 characters"],
        minLength: [2, "Name should have more than 2 characters"],
    },
    email: {
        type: String,
        required: true,
        trim:true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
   password:{
    type:String,
    required:true,
    trim:true,
    minLength: [6, "Password must be of 6 characters"],
   },
   subscribed:{
    type:Boolean,
    default:false
   }
});

module.exports= new mongoose.model("User", userModel)
