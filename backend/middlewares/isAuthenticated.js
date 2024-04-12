const e = require('express');
const passport = require('passport');

const isAuthenticated = (req, res, next)=>{
    passport.authenticate('jwt', {session: false}, (error, user, info)=>{
        // console.log({error, user, info})
        if(error || !user){
            return res.status(401).json({
                message: info ? info?.message : 'Login failed, not token found',
                error: error ? error?.message : undefined
            })
        }

        req.user = user?._id;

        return next();

    })(req, res, next);
}

module.exports = isAuthenticated;