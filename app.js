const express = require('express');
var path = require("path");
const bodyParser = require("body-parser");
var morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const sendotp = require('./utils/sentOtp');

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
    sendotp("+919648666718")
    res.status(200).json({
        status:true,
        msg:"Working..."
    })
})

app.listen(PORT,() =>{
    console.log(`Server is running at port ${PORT}`)
})