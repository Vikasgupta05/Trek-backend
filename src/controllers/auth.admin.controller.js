require("dotenv").config()
const jwt=require("jsonwebtoken")
const Admin=require("../models/adminLogin.model") 

const newToken = (admin)=>{
    
    return jwt.sign({admin},"process.env.SECRET_KEY",)}

    const AdminRegister=("",async(req,res)=>{
        try{
        let  admin = await Admin.findOne({email:req.body.email})
    if(admin){
        return res.json({ status: 'error', error: 'admin have already  Register ' })
    }else{
        const token=newToken(admin)
        admin = await Admin.create(req.body )
    //  console.log('Admin created successfully: ', admin)
    
    }
        }
        
        catch(err){
            return res.send(err.message)
        }
        res.json({ status: 'ok' })
    })



    const Adminlogin=("/",async(req,res)=>{
        try{
            let  admin = await Admin.findOne({email:req.body.email})
            if(!admin){
                return res.json({ status: 'error', error: 'Invalid password or email' })
            }else{
                
            const match=admin.checkPassword(req.body.password)
            if(!match){
                return res.json({ status: 'error', error: 'Invalid password or email' })
            }
            const token=newToken(admin)

            return res.json({ status: 'ok', token: token ,admin : admin })
            }
        }
        
        catch(err){
            return res.send(err.message)
        }
        
    })  
module.exports={AdminRegister,Adminlogin}