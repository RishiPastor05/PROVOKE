const express= require('express');
const app= express();
const cors= require('cors')
const dbconnect= require('./config/database');
require('dotenv').config();
app.use(express.json())
const path = require("path");
const router = require('./routes/userRoute');

const PORT= process.env.PORT || 4000

dbconnect();
app.use(cors())


// mounting the path for api's
app.use('/api/v1', router);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/frontend/build/index.html"));
});


app.listen(PORT, ()=>{
    console.log(`Server is listening at http://localhost:${PORT}`);
})

