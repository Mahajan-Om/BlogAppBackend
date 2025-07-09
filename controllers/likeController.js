
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.createLike = async (req,res)=>{

    try{
        // fetch data
        const {post,user} = req.body;

        const like = new Like({
            post,user
        })

        const savedlike = await like.save() ; // jb bhi database se interaction ho fetching posting etc to await lagao varna empty array milega postman me 

        const updatePost = await Post.findByIdAndUpdate(post , {$push : {likes : savedlike._id}} , {new : true})
                           .populate("likes").exec();

        res.json({
            post:updatePost
        })
    }
    catch(error){
        console.log("Error is ",error);
        return res.status(400).json({
            error : "Error aa gya Bhai." 
        })
    }
}

exports.unlikePosts = async (req,res)=>{
    try{
        // fetch post and liek 
        const {post,like} = req.body;

        // find and delete like collection me se 
        const deletedLike = await Like.findOneAndDelete({post:post , _id:like}); // Like wale model me jb data entry hoga tb like ki id hogi jis post ne like kiya uski id aur user hoga to hum Like model me se aisa data nikal rhe hai jiski post aur like id same ho jo request me bheji hai ab usko delete kr denge findbyone mtlb sbse pehla aisa data jo dega usko delete kr do
        // isko normally findByIdanddelete(like) aisa bhi kr sakte hai but upr wala aur ek mwthid hai 
        
        // update the post collection
        const updatePost = await Post.findByIdAndUpdate(post, {$pull : {likes : deletedLike._id}}, {new : true})
                           .populate("likes").exec();

        res.json({
            post:updatePost,
        })
    }
    catch(error){
        console.log("Error is ",error);
        return res.status(400).json({
            error : "Error aa gya Bhai." 
        })
    }
}