const express = require('express');

const router = express.Router();

// import controllers

const { createComment } = require("../controllers/commentController");
const { createPost } = require("../controllers/postController");
const  { getAllPosts } = require("../controllers/postController");
const { createLike } = require('../controllers/likeController');
const { unlikePosts } = require("../controllers/likeController");



// create mapping to controllers

router.post('/comments/create' , createComment);
router.post('/posts/create' , createPost);
router.get('/posts', getAllPosts)
router.post('/likes/like' , createLike)
router.post('/likes/unlike',unlikePosts);


// export 
module.exports = router;