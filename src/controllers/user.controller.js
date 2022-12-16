const express = require("express")
const User = require("../models/userLogin.model")

const router = express.Router()

  
router.get("",async(req,res)=>{
    try{
     
        const Userdata = await User.find().lean().exec()
        return res.send(Userdata)
        
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router