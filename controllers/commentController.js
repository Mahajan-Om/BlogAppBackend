// import model
// commentcontroller hai to comment wala model import kr liya ab commentmodel ke ander postmodel bhi use hua hai isliye postmodel ko bhi import kr liya


const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// route handler fucntion

exports.createComment = async (req,res)=>{
    try{
        // fetch data from req body
        const {post,user,body} = req.body;
        // now in previous we have used create function to insert comment now we gonna use save function in mongoose to insert comment  for that we have to create a new object of comment  and save that object
        // create a new comment object
        const comment = new Comment({
            post,user,body
        })

        // save the new comment into the database
        const savedComment = await comment.save();  // in previous project Comment pe create use kiya tha ab comment pe save use kiya hai

        // find the post by ID , and add the new comment to its comment array
        // jb bhi comment wale model me entry aayi tab jis post pe comment hua hai uski id nikal li usme 4 hai title body likes comments so correspondinlgy comments wale array me comments ki id dal di
        const updatePost = await Post.findByIdAndUpdate(post ,{$push : {comments : savedComment._id }}, {new : true})  // Post model se post nikal li ab push se nya elemts add hota hai aur pull se delete so commest me savedcomment ki id dal di ab {new : true} likha taki updated object mile naki purana wala object 
                           .populate("comments")  // hamare pass comments ke comment ki id but agr actual commet ya actual document chahiye tab populate use karo here id ki jgh comments ka array aa jayega
                           .exec() // jo query likhi thi usko exec kr diya
        
        res.json({
            post:updatePost
        });
        
        
        }
    catch(error){
        console.log("Error is " , error);
        return res.status(500).json({
            error:"Error while creating error."
        });
    }
}

