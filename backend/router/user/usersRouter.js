const express = require('express');
const userController = require('../../controllers/users/userController');

const usersRouter = express.Router();

usersRouter.post('/register', userController.register);
usersRouter.post('/login', userController.login);
usersRouter.get('/auth/google', userController.googleAuth);
usersRouter.get('/auth/google/callback', userController.googleAuthCallback);

module.exports = usersRouter;