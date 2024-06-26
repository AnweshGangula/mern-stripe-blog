const express = require('express');
const { createPost, listAllPosts, updatePostById, getPostById, deletePostByID } = require('../../controllers/posts/postsController');
const multer = require('multer');

const storage = require('../../utils/fileUpload');
const isAuthenticated = require('../../middlewares/isAuthenticated');

const upload = multer({storage: storage});

const postsRouter = express.Router();

postsRouter.post('/create', isAuthenticated, upload.single('image'), createPost);
postsRouter.get('', listAllPosts)
postsRouter.put('/:postId', isAuthenticated, updatePostById)
postsRouter.get('/:postId', getPostById)
postsRouter.delete('/:postId', isAuthenticated, deletePostByID)

module.exports = postsRouter;
