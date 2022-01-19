const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    googleId:{
        type:String,
        unique:true
    },
    facebookId:{
        type:String,
        unique:true
    }

},
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema,"User");