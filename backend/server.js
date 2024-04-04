const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const Post = require('./models/Post/Post');

const connectDB = require('./utils/connectDB')

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}
app.use(cors(corsOptions))


// Middlewares
app.use(express.json()); // parse json data

// Routes
app.post('/api/v1/posts/create', async (req, res) => {
    try {
        // console.log({body: req.body})
        // get the payload
        const postData = req.body;

        const postCreated = await Post.create(postData);
        // console.log({postData})

        res.status(200).json({
            status: 'success',
            message: 'Post created successfully',
            postCreated
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/api/v1/posts', async (req, res) => {
    try {
        const posts = await Post.find();

        res.json({
            status: 'success',
            message: 'posts fetcehd successfully',
            posts
        })
    } catch (error) {
        res.json(error)
    }
})

app.put('/api/v1/posts/:postId', async (req, res) => {
    try {
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
            status:' Post updated successfully',
            postUpdated
        })
    } catch (error) {
        throw new Error(error);
        res.status(400).json(error)
    }
})

app.get('/api/v1/posts/:postId', async(req, res)=>{
    try {
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

    } catch (error) {
        throw new Error(error);
        res.status(400).json(error)
    }
})

app.delete('/api/v1/posts/:postId', async(req, res)=>{
    try {
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

    } catch (error) {
        throw new Error(error);
        res.status(400).json(error)
    }
})

app.listen(PORT, console.log(`Server listening on port ${PORT}`));