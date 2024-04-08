const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrtegy = require('passport-local').Strategy;

const User = require('../models/User/User');


passport.use(
    new LocalStrtegy({
        usernameField: 'username' // username/email
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                // throw new Error('User not found');
                return done(null, false, { message: 'User with email not found' });
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }

        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport