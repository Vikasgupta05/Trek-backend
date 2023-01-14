const nodemailer = require("nodemailer");
const ContactUs = require("../models/contactUs.model")

    
    const sendMails=("/", async (req,res)=>{
        
        try{
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vikasnwrdr2001@gmail.com',
                    pass: 'ooctiopilnilaxlw'
                }
            });
        
            var mailOptions = {
                from: 'vikasnwrdr2001@gmail.com',
                to: req.body.email,
                subject: 'Treking Contact us',
                text: req.body.text,
            
            };
        
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
            return res.json({ status: 'ok' , user : mailOptions })
        }

        catch(err){
            return res.send(err.message)
        }
    })  

module.exports = { sendMails };



