const express = require('express');
const { createPost, listAllPosts, updatePostById, getPostById, deletePostByID } = require('../../controllers/posts/postsController');
const multer = require('multer');

const storage = require('../../utils/fileUpload')

const upload = multer({storage: storage});

const postsRouter = express.Router();

postsRouter.post('/create', upload.single('image'), createPost);
postsRouter.get('', listAllPosts)
postsRouter.put('/:postId', updatePostById)
postsRouter.get('/:postId', getPostById)
postsRouter.delete('/:postId', deletePostByID)

module.exports = postsRouter;
