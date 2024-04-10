const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrtegy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

// google oauth 2.0
const options = {
    jwtFromRequest: ExtractJWT.fromExtractors([(req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['mern_access_token'];

            return token;
        }
    }]),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(
    new JWTStrategy(options, async (userDecoded, done) => {
        try {
            const user = await User.findById(userDecoded.id);
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
)

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/v1/users/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            const { id, displayName, name, _json: {picture} } = profile;
            let email = '';
            if(Array.isArray(profile.emails) && profile.emails.length > 0){
                email = profile.emails[0].value;
            }

            if(!user){
                user = await User.create({
                    googleId: id,
                    username: displayName,
                    email,
                    profilePicture: picture,
                    authMethod: 'google'
                });
            }
            done(null, user);
        } catch (error) {
            
        }
    })
)

module.exports = passport