const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

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
    // ^Logout
    // ^Profile
}
module.exports = userController;