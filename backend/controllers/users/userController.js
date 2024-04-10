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
        const userFound = await User.findOne({ username, email });
        if (userFound) {
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
    login: asyncHandler(async (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            // console.log({user});
            // console.log({info});

            if (!user) {
                return res.status(401).json({ message: info.message })
            }

            const mern_access_token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            console.log({ token: mern_access_token });

            res.cookie('mern_access_token', mern_access_token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 });
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
    googleAuth: passport.authenticate('google', {
        scope: ['profile'],
    }),
    googleAuthCallback: asyncHandler(async (req, res, next) => {
        passport.authenticate('google', {
            failureRedirect: '/login',
            session: false,
            // scope: ['profile'],
        }, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.redirect('http://localhost:5173/google-login-error');
            }
            // generate token
            const mern_google_access_token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
            res.cookie(
                'mern_access_token',
                mern_google_access_token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60 * 24 * 3
                }
            );
            res.redirect('http://localhost:5173/dashboard');
        })(req, res, next)
    }),
}
module.exports = userController;