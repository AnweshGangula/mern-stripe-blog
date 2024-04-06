const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const asyncHandler = require('express-async-handler');

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
app.post('/api/v1/posts/create', asyncHandler(async (req, res) => {
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
}))

app.get('/api/v1/posts', asyncHandler(async (req, res) => {
    const posts = await Post.find();

    res.json({
        status: 'success',
        message: 'posts fetcehd successfully',
        posts
    })

}))

app.put('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
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
}))

app.get('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
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

}))

app.delete('/api/v1/posts/:postId', asyncHandler(async (req, res) => {
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


}))

// Not Found Handler
app.use((req, res, next)=>{
    res.status(404).json({message: 'Route not found'})
})

// Error Handling middleWare
app.use((err, req, res, next) => {
    // console.log({err})
    const message = err.message;
    const stack = err.stack
    // console.log({message})
    res.status(500).json({ message, stack })
})

app.listen(PORT, console.log(`Server listening on port ${PORT}`));