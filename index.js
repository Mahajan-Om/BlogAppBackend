const express = require('express');  // import an instance of express

const app = express();  


// adding configuration to this file

require('dotenv').config();

const PORT = process.env.PORT || 3000

// middleware 
// That data comes into your Express server as a raw stream. By default, Express doesn’t know how to handle or parse it. so it is used to parse incoming JSON data in the body of HTTP requests.
app.use(express.json());

// route creation 1) import
const blog = require("./routes/blog");

// 2) mount
app.use('/api/v1', blog);

const dbconnect = require("./config/database");
dbconnect();

app.listen(PORT , ()=>{
    console.log(`server is started at ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send("This is Homepage.")
})


