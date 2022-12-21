const mongoose = require("mongoose");



const contactUsSchema = new mongoose.Schema(
    {
        fullName: { type: String,},
        email: { type: String,},
        contact: { type: String,},
        subject: { type: String,},
        message: { type: String,},

    },{ timestamps: true, }
);


module.exports = mongoose.model("contactUs", contactUsSchema); 
