const mongoose = require("mongoose");



const querySchema = new mongoose.Schema(
    {
        email: { type: String,},
        fullName: { type: String,},
        contact: { type: String,},
        query: { type: String,},
        message: { type: String,},

    },{ timestamps: true, }
);


module.exports = mongoose.model("query", querySchema); 
