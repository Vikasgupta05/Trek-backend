const express = require("express")
const UpcomingTrek = require("../models/upComing.modal")
const {upload,uploadSingle}=require("../middleware/imageUpload")
// const path =require("path")


const router = express.Router()




router.get("",async(req,res)=>{
    try{
    
        const upcomingTrek = await UpcomingTrek.find().lean().exec()
      
        return res.send(upcomingTrek ) 
        
    }catch(err){ 
        return res.status(500).send(err.message)
    }
})


router.get("/:id", async (req, res) => {
    try {
      const upcomingTrek = await UpcomingTrek.findById(req.params.id).lean().exec();
  
      if (upcomingTrek) {
        return res.send(upcomingTrek);
      } else {
        return res.status(404).send({ message: "upcomingTrek not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
});


router.post("", uploadSingle("image") ,async(req,res)=>{
  try{
      const upcomingTrek = await UpcomingTrek.create({
        title: req.body.title,
        about: req.body.about,
        heading: req.body. heading,
        days: req.body.days,
        level: req.body.level,
        fee: req.body.fee,
        image: req.file.path
      })
      return res.send(upcomingTrek)
  }catch(err){
      return res.status(500).send({message:err.message})
  }
})


router.patch("/:id", uploadSingle("image") ,async (req, res) => {
  try{
    const upcomingTrek = await UpcomingTrek.findByIdAndUpdate(req.params.id ,{
      title: req.body.title,
      about: req.body.about,
      heading: req.body. heading,
      days: req.body.days,
      level: req.body.level,
      fee: req.body.fee,
      image: req.file.path
    
    })
    return res.send(upcomingTrek)
}
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const upcomingTrek = await UpcomingTrek.findByIdAndDelete(req.params.id).lean().exec();

    if (upcomingTrek) {
      return res.send(upcomingTrek);
    } else {
      return res.status(404).send({ message: "upcomingTrek not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


module.exports = router
