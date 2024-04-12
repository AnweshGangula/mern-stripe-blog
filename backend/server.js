const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const passport = require("./utils/passport-config");
const postsRouter = require('./router/post/postRouter');
const usersRouter = require('./router/user/usersRouter');

const connectDB = require('./utils/connectDB')

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}
app.use(cors(corsOptions))

app.use(passport.initialize());
app.use(cookieParser()); // automatically parses cookies


// Middlewares
app.use(express.json()); // parse json data

// Route Handlers
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);

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