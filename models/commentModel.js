// import mongoose
const mongoose = require('mongoose');

// momngoose schema

const commentSchema = new mongoose.Schema({
    post:{   // konse post pe comment kiya kya comment kiya ye ek dusre object me hoga aur uski id yha define karenge  id define krne ke liye following syntax use hota hai
        type:mongoose.Schema.Types.ObjectId,
        ref : "Post", // ref to the post model
    },

    user:{
        type:String,
        required:true
    },

    body:{
        type:String,
        required:true
    }
})


// export 

module.exports = mongoose.model("Comment",commentSchema);