const express = require('express');
var path = require("path");
const bodyParser = require("body-parser");
var morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const sendotp = require('./utils/sentOtp');

//models
const Otp = require("./models/otp");
const User = require("./models/user");

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));


const app = express();

const PORT = 8080

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get("/",(req,res) =>{
    // sendotp("+919648666718")
    res.status(200).json({
        status:true,
        msg:"Working..."
    })
})

//send otp for registration
app.post("/register",async(req,res) =>{
    try{
        const phone = req.body.phone;
        let userCheck = await User.findOne({phone:phone})
        if(userCheck){
            return res.status(400).json({
                status:false,
                msg:"User with this phone already exists."
            })
        }
        let otp = await sendotp(phone);
        if(!otp.status){
            return res.status(400).json({
                status:false,
                msg:otp.msg
            })
        }
        let checkOtpObj = await Otp.findOneAndDelete({phone:phone});
        let createOtpRecord = new Otp({phone:phone,otp:otp.otp});
        let saveOtp = await createOtpRecord.save();

        res.json(otp)
        
    }catch(err){
        console.log(err)
    }
})

app.listen(PORT,() =>{
    console.log(`Server is running at port ${PORT}`)
})