const express = require("express")
const Header = require("../models/headeer.model")

const router = express.Router()


router.post("",async(req,res)=>{
    try{
     
        const headerdata=await Header.create(req.body)
        return res.json({ status: 'ok', data: headerdata})
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get("",async(req,res)=>{
    try{
     
        const headerdata=await Header.find().lean().exec()
      
        return res.send(headerdata)
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})
module.exports=router
