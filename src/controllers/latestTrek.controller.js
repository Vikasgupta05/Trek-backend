const express = require("express")
const LatestTrek = require("../models/latestTrek.modal")
const {upload,uploadSingle}=require("../middleware/imageUpload")
// const path =require("path")


const router = express.Router()




router.get("",async(req,res)=>{
    try{
    
        const latestTrek = await LatestTrek.find().lean().exec()
      
        return res.send(latestTrek ) 
        
    }catch(err){ 
        return res.status(500).send(err.message)
    }
})


router.get("/:id", async (req, res) => {
    try {
      const latestTrek = await LatestTrek.findById(req.params.id).lean().exec();
  
      if (latestTrek) {
        return res.send(latestTrek);
      } else {
        return res.status(404).send({ message: "latestTrek not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
});


router.post("", uploadSingle("image") ,async(req,res)=>{
  try{
      const latestTrek = await LatestTrek.create({
        title: req.body.title,
        about: req.body.about,
        heading: req.body. heading,
        days: req.body.days,
        level: req.body.level,
        fee: req.body.fee,
        image: `https://trek-backend.onrender.com/showImage?download=${req.file.filename}` 
      })
      return res.send(latestTrek)
  }catch(err){
      return res.status(500).send({message:err.message})
  }
})


router.patch("/:id", uploadSingle("image") ,async (req, res) => {
  try{
    const latestTrek = await LatestTrek.findByIdAndUpdate(req.params.id ,{
      title: req.body.title,
      about: req.body.about,
      heading: req.body. heading,
      days: req.body.days,
      level: req.body.level,
      fee: req.body.fee,
      // image: "http://localhost:2345/showImage?download="+(req.file.path).split("/").pop()

      image: `https://trek-backend.onrender.com/showImage?download=${req.file.filename}` 

    })
    return res.send(latestTrek)
}
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const latestTrek = await LatestTrek.findByIdAndDelete(req.params.id).lean().exec();

    if (latestTrek) {
      return res.send(latestTrek);
    } else {
      return res.status(404).send({ message: "latestTrek not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});





module.exports = router
