const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/User/User');

const userController = {
    // ^Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        // check if user exists
        const userFound = await User.findOne({ username, email});
        if(userFound){
            throw new Error('User already exists');
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // register user and send response

        const registeredUser = User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            registeredUser
        })

    }),
    // ^Login
    login: asyncHandler(async (req, res, next ) => {
        passport.authenticate('local', (err, user, info)=>{
            if(err) return next(err);
            // console.log({user});
            // console.log({info});

            if(!user){
                return res.status(401).json({message: info.message})
            }

            const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
            console.log({token});

            res.cookie('token', token, {httpOnly: true, secure: false, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24});
            res.json({
                status: 'success',
                message: 'User logged in successfully',
                username: user?.username,
                email: user?.email,
                _id: user?._id,
                // token
            });


        })(req, res, next);
    }),
    // ^Logout
    // ^Profile
}
module.exports = userController;