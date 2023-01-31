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
        overview: { type: String },
        highlight: { type: String },
        itinerary: { type: String },
        transport: { type: String },
        meals: { type: String },
        permits: { type: String },
        excluded: { type: String },
        thingsToCarry: { type: String },
        cancelationPoilicy: { type: String },
        termsCondition: { type: String },
        accommodation: { type: String },
        notes: { type: String },
        image: [{type:String}],

    },{ timestamps: true, }
);

module.exports = mongoose.model("trek", TrekSchema); 
