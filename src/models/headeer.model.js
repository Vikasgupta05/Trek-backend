const mongoose = require("mongoose");



const headerSchema = new mongoose.Schema(
    {
        header: { type: String },
        subHeader : [{
            title: String ,
        }],
        
    },{ timestamps: true, }
);


module.exports = mongoose.model("header", headerSchema); 
