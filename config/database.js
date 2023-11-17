const {mongoose } = require('mongoose')
require('dotenv').config();
const dbconnect =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( console.log("Database connect successfully"))
    .catch((error)=>{
        console.log("Error in connecting the database");
        console.log(error);
        process.exit(1);
    })
}
module.exports= dbconnect;