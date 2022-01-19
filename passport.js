require("dotenv").config()

//models
const Otp = require('./models/otp');
const User = require('./models/user');

//google oauth2
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'phone',
        passwordField: 'otp'
    }, 
    async function (phone, otp, cb) {
        //check whether otp match or not
        let otpCheck = await Otp.findOne({phone,otp});
        if(!otpCheck){
            return cb(null,false,{message:"Invalid Otp"});
        }
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return await User.findOne({phone})
           .then( async (user) => {
               if (!user) {
                   let user = await User.create({phone:phone,isVerified:true})
                   await Otp.findOneAndDelete({phone,otp});
                   return cb(null, user, {message: 'User Create and login'});
               }
               await Otp.findOneAndDelete({phone,otp})
               return cb(null, user, {message: 'Logged In Successfully'});
          })
          .catch(err => cb(err));
    }
));

//authentication check
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'njhgfdhjkgvbh67'
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload._id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));


//google oauth2.0 authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/user/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return done(null,profile)
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });