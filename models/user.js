const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},
    {timestamps:true}
);

module.exports = mongoose.model("User",userSchema,"User");