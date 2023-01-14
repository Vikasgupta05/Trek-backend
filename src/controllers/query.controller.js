const express = require("express")
// const query  = require("../models/Query.model")
const Query = require("../models/query.model")

const router = express.Router()
const nodemailer = require("nodemailer");



router.get("",async(req,res)=>{
    try{
        const query  = await Query.find().lean().exec()
        return res.send(query  ) 
        
    }catch(err){ 
        return res.status(500).send(err.message)
    }
})



router.post("",async(req,res)=>{
    try{
      const query  = await Query.create(req.body)

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
        subject: 'Treking Query',
        text: req.body.message,
      
      };

      console.log("mailOptions " , mailOptions)

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
      });
        return res.json({ status: 'ok', data: query  } )
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})


router.delete("/:id", async (req, res) => {
  try {
    const query  = await Query.findByIdAndDelete(req.params.id).lean().exec();

    if (query ) {
      return res.send(query );
    } else {
      return res.status(404).send({ message: "query  not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


module.exports = router