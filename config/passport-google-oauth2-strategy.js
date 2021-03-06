const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login.. 
passport.use(new googleStrategy({
    clientID: "914951426232-2gle8hrsed8oe8nt3j4n1a9copgb9hgi.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},

function(accessToken, refreshToken, profile, done){

    // find  a user..
    User.findOne({email:profile.emails[0].value}).exec(function(err, user){
         if(err){console.log('error in google strategy-passport', err); return;}
         console.log(accessToken, refreshToken);
         console.log(profile);

         if(user){
            // if found, set this user as req.user..
            return done(null,user);
         }else{
            // if not found , the user and set it as req.user..
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){console.log('error in creating user google strategy-passport', err); return;}

                return done(null,user);
            });
         }
    });
}

));

module.exports = passport;