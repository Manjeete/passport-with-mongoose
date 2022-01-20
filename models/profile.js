const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profileSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String
        },
        email: {
            type: String,
            required: false,
            default: null,
        },
        image: {
            type: String,
            default: "profilepics/profile.png",
        } 
    },
    { timestamps: true }
);
module.exports = mongoose.model("Profile", profileSchema, "Profile");
