const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    googleId:{
        type:String
    },
    facebookId:{
        type:String
    }

},
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema,"User");