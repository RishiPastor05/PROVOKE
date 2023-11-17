const mongoose = require("mongoose");

const subsModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type:Number,
        required:true,
    },
  
});

module.exports= new mongoose.model("Subscription", subsModel)
