const express = require('express');
const asyncHandler = require('express-async-handler');

const Post = require('../../models/Post/Post');

const postsRouter = express.Router();

postsRouter.post(
    '/create',
    asyncHandler(async (req, res) => {
        // console.log({body: req.body})
        // get the payload
        const postData = req.body;

        const existingPost = await Post.findOne({ title: postData.title });
        if (existingPost) {
            throw new Error('Post with this title already exists');
        };

        const postCreated = await Post.create(postData);
        // console.log({postData})

        res.status(200).json({
            status: 'success',
            message: 'Post created successfully',
            postCreated
        })
    })
)

postsRouter.get(
    '',
    asyncHandler(async (req, res) => {
        const posts = await Post.find();

        res.json({
            status: 'success',
            message: 'posts fetcehd successfully',
            posts
        })

    })
)

postsRouter.put(
    '/:postId',
    asyncHandler(async (req, res) => {
        const postId = req.params.postId;

        const postFound = await Post.findById(postId)
        if (!postFound) {
            throw new Error('Post not found')
        }

        const postUpdated = await Post.findByIdAndUpdate(
            postId,
            {
                title: req.body.title,
                description: req.body.description
            },
            {
                new: true,
            }
        )

        res.json({
            status: ' Post updated successfully',
            postUpdated
        })
    })
)

postsRouter.get(
    '/:postId',
    asyncHandler(async (req, res) => {
        const postId = req.params.postId;

        const postFound = await Post.findById(postId);

        if (!postFound) {
            throw new Error('Post not found')
        }

        res.json({
            status: 'success',
            message: "Post Fetched successfully",
            postFound
        })
    })
)

postsRouter.delete(
    '/:postId',
    asyncHandler(async (req, res) => {
        const postId = req.params.postId;

        const postFound = await Post.findByIdAndDelete(postId);

        if (!postFound) {
            throw new Error('Post not found')
        }

        res.json({
            status: 'success',
            message: "Post Deleted successfully",
            // postFound
        })
    })
)

module.exports = postsRouter;
