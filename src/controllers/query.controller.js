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
        return res.status(500).send(err.query)
    }
})



router.post("",async(req,res)=>{
    try{
      const query  = await Query.create(req.body)

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'kumgarhhikes@gmail.com',
            pass: 'kxyaynfswruobfuc'
          }
      });

      var mailOptions = {
        from: req.body.email,
        to: "kumgarhhikes@gmail.com",
        subject: 'Treking Contact us',
        text: req.body.message,
      
      };


      // console.log("mailOptions " , mailOptions)

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
      });
        return res.json({ status: 'ok', data: query  } )
        
    }catch(err){
        return res.status(500).send(err.query)
    }
})


router.delete("/:id", async (req, res) => {
  try {
    const query  = await Query.findByIdAndDelete(req.params.id).lean().exec();

    if (query ) {
      return res.send(query );
    } else {
      return res.status(404).send({ query: "query  not found" });
    }
  } catch (err) {
    return res.status(500).send(err.query);
  }
});


module.exports = router
