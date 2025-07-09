
const mongoose  = require('mongoose');

require("dotenv").config() ; // it loads all env info in process object

const dbconnect = () => {

    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("DB is connected successfully."))
    .catch((error) =>{
        console.log("Db is facing connection issues.")
        console.log(error);
        process.exit(1);
    })
}

module.exports = dbconnect;