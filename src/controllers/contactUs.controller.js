const express = require("express")
const ContactUs = require("../models/contactUs.model")
const router = express.Router()


router.get("",async(req,res)=>{
    try{
        const contactUs = await ContactUs.find().lean().exec()
        return res.send(contactUs ) 
        
    }catch(err){ 
        return res.status(500).send(err.message)
    }
})



router.post("",async(req,res)=>{
    try{
        const contactUs = await ContactUs.create(req.body)
        return res.json({ status: 'ok', data: contactUs } )
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})


router.delete("/:id", async (req, res) => {
  try {
    const contactUs = await ContactUs.findByIdAndDelete(req.params.id).lean().exec();

    if (contactUs) {
      return res.send(contactUs);
    } else {
      return res.status(404).send({ message: "contactUs not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


module.exports = router
