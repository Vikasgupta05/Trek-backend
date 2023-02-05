require("dotenv").config()
const jwt=require("jsonwebtoken")
const User=require("../models/userLogin.model") 

const newToken = (user)=>{
    return jwt.sign({user},"process.env.SECRET_KEY",)
}

const register=("",async(req,res)=>{
    try{
        let  user= await User.findOne({email:req.body.email})
        if(user){
            return res.json({ status: 'error', error: 'user have already register ' })
        }else{
            const token=newToken(user)
            user=await User.create(req.body )
        }
    }
    catch(err){
        return res.send(err.message)
    }
    res.json({ status: 'ok' })
})


const login=("/",async(req,res)=>{
    try{
        let  user= await User.findOne({email:req.body.email})
            if(!user){
                return res.json({ status: 'error', error: 'Invalid password or email' })
            }else{
                
                const match=user.checkPassword(req.body.password)
            if(!match){
                return res.json({ status: 'error', error: 'Invalid password or email' })
            }
            const token=newToken(user)
            return res.json({ status: 'ok', token: token , user : user._id })
        }
    }
    
    catch(err){
        return res.send(err.message)
    }
    
})
module.exports={register,login}