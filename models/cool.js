const mongoose = require("mongoose");

const coolSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    owes:[
        {
            userId:{
                type:String
            },
            amount:{
                type:Number
            }
        }
        
    ]
});

module.exports = mongoose.model("Cool",coolSchema,"Cool");