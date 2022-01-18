const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require("passport");

//utils
const sendotp = require("../utils/sentOtp");

//models
const Otp = require('../models/otp');
const User = require('../models/user');

//send otp for registration
router.post("/otp",async(req,res) =>{
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

//user login
router.post("/login",function(req,res,next){
    passport.authenticate('local',{session:false},(err,user,info) =>{
        if(err || !user){
            console.log(err)
            return res.status(400).json({
                status:false,
                msg:"Something went wrong"
            })
        }
        req.login(user,{session:false},(err) =>{
            if(err){
                res.send(err)
            }
            const token = jwt.sign(user.toJSON(), 'njhgfdhjkgvbh67');
            return res.json({user, token});
        })
    })(req,res);

});


//protected routes
router.get("/protected-check",passport.authenticate('jwt', {session: false}),async(req,res) =>{
    res.status(200).json({
        status:true,
        msg:"ok"
    })
})

module.exports = router;