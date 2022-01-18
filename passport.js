//models
const Otp = require('./models/otp');
const User = require('./models/user');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

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