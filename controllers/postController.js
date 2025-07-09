const Post = require("../models/postModel");

exports.createPost = async (req,res)=>{

    try{
        const {title,body} = req.body;

        const post = new Post({
            title,body
        })

        const savedPost = await post.save();

        res.json({    // agr ye dena bhul gye to postman bs loading krte rahega
            post:savedPost
        })
    }
    catch(error){
        console.log("Error is " , error);
        res.status(400).json({
            error:"Error aa gya Bhai."
        })
    }
}

exports.getAllPosts = async (req,res) =>{

    try{
        //const posts = Post.find();  isse sari post me likes aur comments ki bs id hi milegi
        const posts = await Post.find().populate("comments").exec();  // await bhul gye to empty array dega 
        
        res.json({
            posts,
        })
    }
    catch(error){
        console.log("Error is " , error);
        res.status(400).json({
            error:"Error aa gya Bhai."
        })
    }
}
