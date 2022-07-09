const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const user = require('../models/user');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
  
    User.findById(jwtPayload._id, function(err, user){
        if(err){console.log('Error in finding user from jwt'); return;}

        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;

