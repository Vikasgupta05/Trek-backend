const express = require("express")
const LatestTrek = require("../models/latestTrek.modal")
const {upload,uploadSingle}=require("../middleware/imageUpload")


const router = express.Router()


router.post("", uploadSingle("image") ,async(req,res)=>{
    try{
        const latestTrek = await LatestTrek.create({
          title: req.body.title,
          about: req.body. about,
          days: req.body.days,
          level: req.body.level,
          image: req.file.path,
        })
        return res.send(latestTrek)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
})

module.exports = router
