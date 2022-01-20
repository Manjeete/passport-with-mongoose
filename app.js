const express = require('express');
var path = require("path");
const bodyParser = require("body-parser");
var morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

//models
const Otp = require("./models/otp");
const User = require("./models/user");

//router
const authRouter = require("./routes/auth");

//passport
require("./passport");

//MongoDB database connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));


const app = express();

const PORT = 8080

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//auth routes
app.use("/user",authRouter);


app.listen(PORT,() =>{
    console.log(`Server is running at port ${PORT}`)
})