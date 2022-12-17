const mongoose = require("mongoose");



const latestTrekSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        about: { type: String, required: true },
        days: { type: String, required: true },
        level: { type: String, required: true },
        image: [{type:String}]

    },{ timestamps: true, }
);


module.exports = mongoose.model("latestTrek", latestTrekSchema); 
