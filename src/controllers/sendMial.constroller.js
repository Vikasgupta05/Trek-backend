const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// var nodemailer = require('nodemailer');


const sendMails = async (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vikasnwrdr2001@gmail.com',
            pass: 'Vikas952001@'
        }
    });
    
    var mailOptions = {
        from: 'vikasnwrdr2001@gmail.com',
        to: 'mohitgupta4115@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
       
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
 
};
module.exports = { sendMails };



