const express = require("express")
const fs = require("fs")
const Trek = require("../models/trek.model")
const {upload,uploadSingle}=require("../middleware/imageUpload")
// const path =require("path")


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


router.post("", uploadSingle("image") ,async(req,res)=>{
    try{
        console.log("uploadSingle ",req.body);
        const trek = await Trek.create({
        category: req.body.category,
        title: req.body.title,
        about: req.body.about,
        heading: req.body. heading,
        days: req.body.days,
        level: req.body.level,
        fee: req.body.fee,
        image: `https://trek-backend.onrender.com/showImage?download=${req.file.filename}` 
      })
      return res.send(trek)
  }catch(err){
      return res.status(500).send({message:err.message})
  }
})

// router.post("/trekByCategory", async(req,res)=>{
    
//     try{
//         console.log("req.body.trekByCategory", req.body);
//         let treks = [];
//         if(req.body.category){
//             treks = await Trek.find({category: req.body.category}).lean().exec();
//             console.log("AAA");
            
//         }else{
//             treks = await Trek.find().lean().exec()
//         }

//         return res.send(treks)
//     }catch(err){
//         return res.status(500).send({message:err.message})
//     }
// })



router.post("/trekByCategory", async(req,res)=>{
    
    try{
        let treks = [];
        if(req.body.category){
            console.log("req.body.trekByCategory", req.body)    
            treks = await Trek.find({category: req.body.category}).lean().exec();
            console.log("AAA");
        }else{
            treks = await Trek.find().lean().exec()
        }

        return res.send(treks)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

router.patch("/:id", uploadSingle("image") ,async (req, res) => {
  try{
    let trekToUpdate = {
      category: req.body.category,
      title: req.body.title,
      about: req.body.about,
      heading: req.body. heading,
      days: req.body.days,
      level: req.body.level,
      fee: req.body.fee,
    }
    if(req.file){
      trekToUpdate.image= `https://trek-backend.onrender.com/showImage?download=${req.file.filename}`;
      const oldTrek = await Trek.findById(req.params.id).lean().exec();
      if(oldTrek && oldTrek.image && oldTrek.image.length>0){
        let olfFile = (oldTrek.image[0]).split("download=").pop()
        fs.unlink(`src/upload/${olfFile}`, (err => {
          if (err) console.log(err);
          else {
            console.log(`\nDeleted file:${olfFile}`);
          }
        }));
      }
    }

    const trek = await Trek.findByIdAndUpdate(req.params.id, trekToUpdate)
    const updatedTrek = await Trek.findById(req.params.id).lean().exec();
    return res.send(updatedTrek)
}
  catch (err) {
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const oldTrek = await Trek.findById(req.params.id).lean().exec();
    if(oldTrek && oldTrek.image && oldTrek.image.length>0){
      let olfFile = (oldTrek.image[0]).split("download=").pop()
      fs.unlink(`src/upload/${olfFile}`, (err => {
        if (err) console.log(err);
        else {
          console.log(`\nDeleted file:${olfFile}`);
        }
      }));
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
