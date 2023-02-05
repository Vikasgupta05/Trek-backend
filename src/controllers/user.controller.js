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



router.get("/:id", async (req, res) => {
    try{
      const user = await User.findById(req.params.id).lean().exec();
      if (user) {
        return res.send(user);
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
});
module.exports=router