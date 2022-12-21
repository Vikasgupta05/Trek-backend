const express = require("express")
const PopularTrek = require("../models/popularTrek.model")
const {upload,uploadSingle}=require("../middleware/imageUpload")
// const path =require("path")


const router = express.Router()




router.get("",async(req,res)=>{
    try{
    
        const popularTrek = await PopularTrek.find().lean().exec()
      
        return res.send(popularTrek ) 
        
    }catch(err){ 
        return res.status(500).send(err.message)
    }
})


router.get("/:id", async (req, res) => {
    try {
      const popularTrek = await PopularTrek.findById(req.params.id).lean().exec();
  
      if (popularTrek) {
        return res.send(popularTrek);
      } else {
        return res.status(404).send({ message: "popularTrek not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
});


router.post("", uploadSingle("image") ,async(req,res)=>{
  try{
      const popularTrek = await PopularTrek.create({
        title: req.body.title,
        about: req.body.about,
        heading: req.body. heading,
        days: req.body.days,
        level: req.body.level,
        fee: req.body.fee,
        image: req.file.path
      })
      return res.send(popularTrek)
  }catch(err){
      return res.status(500).send({message:err.message})
  }
})


router.patch("/:id", uploadSingle("image") ,async (req, res) => {
  try{
    const popularTrek = await PopularTrek.findByIdAndUpdate(req.params.id ,{
      title: req.body.title,
      about: req.body.about,
      heading: req.body. heading,
      days: req.body.days,
      level: req.body.level,
      fee: req.body.fee,
      image: req.file.path
    
    })
    return res.send(popularTrek)
}
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const popularTrek = await PopularTrek.findByIdAndDelete(req.params.id).lean().exec();

    if (popularTrek) {
      return res.send(popularTrek);
    } else {
      return res.status(404).send({ message: "popularTrek not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


module.exports = router
