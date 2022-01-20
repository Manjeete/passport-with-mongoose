const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require("passport");

//utils
const sendotp = require("../utils/sentOtp");

//models
const Otp = require('../models/otp');
const User = require('../models/user');
const Profile = require("../models/profile");

//send otp for registration
router.post("/otp",async(req,res) =>{
    try{
        const phone = req.body.phone;
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
        req.login(user,{session:false},async(err) =>{
            if(err){
                res.send(err)
            }
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
            const profile = await Profile.findOne({user:user._id})
            return res.status(200).json({
                status:true,
                user:user,
                profile:profile,
                token:token
            });
        })
    })(req,res);

});

//google auth
router.get("/auth/google",
    passport.authenticate('google',{scope:['email','profile']})
)

router.get('/google/callback',
    passport.authenticate('google',{session:false}),async(req,res)=>{
        const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET_KEY);
        let profile = await Profile.findOne({user:req.user._id})
        res.status(200).json({
            status:false,
            user:req.user,
            profile,
            token
        })
    }
)


//facebook auth
router.get("/auth/facebook",passport.authenticate('facebook',{ scope:['email'] }))

router.get("/facebook/callback",
    passport.authenticate('facebook',{session:false}),async(req,res) =>{
        const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET_KEY);
        let profile = await Profile.findOne({user:req.user._id})
        res.status(200).json({
            status:false,
            user:req.user,
            profile,
            token
        })
    }
)

//check whether user logged in or not
const isAuthenticated =(req,res,next) =>{
    if(!req.headers.authorization || !req.headers.authorization.split(' ')[0] === 'Bearer'){
        return res.status(401).json({
            status:false,
            msg:"Authorization token is required."
        })
    }
    return passport.authenticate('jwt',{session:false},(err,user,info)=>{
        if(err){
            return res.status(500).send({msg: 'Internal Server Error'})
        }
        if(user){
            req.user = user;
            next();
        }else{
            return res.status(401).send({msg: 'Unauthorized'})
        }
    })(req,res);
} 



//protected routes
router.get("/protected-check",isAuthenticated,async(req,res) =>{
    res.status(200).json({
        status:true,
        user:req.user,
        msg:"Only logged In User can see this message."
    })
})

module.exports = router;