const mongoose = require("mongoose");



const TrekSchema = new mongoose.Schema(
    {
        category: { type: String },
        title: { type: String },
        about: { type: String },
        heading: { type: String },
        days: { type: String },
        level: { type: String },
        fee: { type: String },
        image: [{type:String}]
        

    },{ timestamps: true, }
);


module.exports = mongoose.model("trek", TrekSchema); 
