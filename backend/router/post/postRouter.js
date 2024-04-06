const express = require('express');
const { createPost, listAllPosts, updatePostById, getPostById, deletePostByID } = require('../../controllers/posts/postsController');


const postsRouter = express.Router();

postsRouter.post('/create', createPost)
postsRouter.get('', listAllPosts)
postsRouter.put('/:postId', updatePostById)
postsRouter.get('/:postId', getPostById)
postsRouter.delete('/:postId', deletePostByID)

module.exports = postsRouter;
