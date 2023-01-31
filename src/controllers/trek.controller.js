const express = require("express")
const fs = require("fs")
const Trek = require("../models/trek.model")
const {upload, uploadSingle , uploadMultiple }=require("../middleware/imageUpload")

const router = express.Router()


router.get("",async(req,res)=>{
    try{
      const trek = await Trek.find().lean().exec()
      return res.send(trek ) 
        
    }catch(err){ 
      return res.status(500).send(err.message)
    }
})


router.get("/:id", async (req, res) => {
    try {
      const trek = await Trek.findById(req.params.id).lean().exec();
  
      if (trek) {
        return res.send(trek);
      } else {
        return res.status(404).send({ message: "trek not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
});


router.post("",  uploadMultiple('image'),async(req,res)=>{
    try{
      console.log(req.files);
        const filepaths = req.files.map((file)=>`http://localhost:2345/showImage?download=${file.filename}`)
        const trek = await Trek.create({
          category: req.body.category,
          title: req.body.title,
          about: req.body.about,
          heading: req.body.heading,
          days: req.body.days,
          level: req.body.level,
          fee: req.body.fee,
          overview: req.body.overview,
          highlight: req.body.highlight,
          itinerary: req.body.itinerary,
          transport: req.body.transport,
          meals: req.body.meals,
          permits: req.body.permits,
          excluded: req.body.excluded,
          thingsToCarry: req.body.thingsToCarry,
          cancelationPoilicy: req.body.cancelationPoilicy,
          termsCondition: req.body.termsCondition,
          notes: req.body.notes,
          accommodation: req.body.accommodation,
          // image: `http://localhost:2345/showImage?download=${req.file.filename}`,
          image: filepaths
      })

      // console.log("filepaths ",filepaths);
      return res.send(trek)
  }catch(err){
      return res.status(500).send({message:err.message})
  }
})


router.post("/trekByCategory", async(req,res)=>{
    
    try{
        let treks = [];
        if(req.body.category){
            treks = await Trek.find({category: req.body.category}).lean().exec();
        }else{
            treks = await Trek.find().lean().exec()
        }

        return res.send(treks)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.patch("/:id", uploadMultiple("image") ,async (req, res) => {
  try{
    const filepaths = req.files.map((file)=>`http://localhost:2345/showImage?download=${file.filename}`)
    let trekToUpdate = {
      category: req.body.category,
      title: req.body.title,
      about: req.body.about,
      heading: req.body. heading,
      days: req.body.days,
      level: req.body.level,
      fee: req.body.fee,
      overview: req.body.overview,
      highlight: req.body.highlight,
      itinerary: req.body.itinerary,
      transport: req.body.transport,
      meals: req.body.meals,
      permits: req.body.permits,
      excluded: req.body.excluded,
      thingsToCarry: req.body.thingsToCarry,
      cancelationPoilicy: req.body.cancelationPoilicy,
      termsCondition: req.body.termsCondition,
      notes: req.body.notes,
      accommodation: req.body.accommodation,


    }
    if(req.file || req.files ){
      trekToUpdate.image= filepaths;
      const oldTrek = await Trek.findById(req.params.id).lean().exec();
      if(oldTrek && oldTrek.image && oldTrek.image.length>0){

        for(var i=0; i<oldTrek.image.length; i++){
          let olfFile = (oldTrek.image[i]).split("download=").pop()
          fs.unlink(`src/upload/${olfFile}`, (err => {
            if (err) console.log(err);
            else {
              console.log(`\nDeleted file:${olfFile}`);
            }
          }));
        }
      }
    }

    const trek = await Trek.findByIdAndUpdate(req.params.id, trekToUpdate ,  {new: true})
    return res.send(trek)
}
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const oldTrek = await Trek.findById(req.params.id).lean().exec();
    if(oldTrek && oldTrek.image && oldTrek.image.length>0){
      for(var i=0; i<oldTrek.image.length; i++){
        let olfFile = (oldTrek.image[i]).split("download=").pop()
        fs.unlink(`src/upload/${olfFile}`, (err => {
          if (err) console.log(err);
          else {
            console.log(`\nDeleted file:${olfFile}`);
          }
        }));
      }
    }

    const trek = await Trek.findByIdAndDelete(req.params.id).lean().exec();
    if (trek) {
      return res.send(trek);
    } else {
      return res.status(404).send({ message: "trek not found" });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});





module.exports = router
