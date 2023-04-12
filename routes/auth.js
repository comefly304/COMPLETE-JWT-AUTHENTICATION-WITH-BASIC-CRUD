const userRouter=require('express').Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const authentication=require('../authentication')

userRouter.post("/register",async (req,res)=>{
    try{
    const {username,email,password}=req.body

   const hash=await  bcrypt.hash(password,10)
    const user=new User({
        username,
        email,
        password:hash
    })
    try{
         await user.save()
         return res.json({
            msg:"registered successfully...,please login",
              data:user
         })
    }catch(err){
        return res.send(err)
    }

    }catch(err){
        return res.send(err)
    }
})


//LOGIN
userRouter.post("/login",async (req,res)=>{
    try{
    const {email,password}=req.body
     
    const user=await User.findOne({email:email})
   bcrypt.compare(password,user.password,function(err,result){
    if(err){
        return res.send(err)
    }if(result){
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
        const{password,...others}=user._doc;
        return res.json({
            msg:"login successful...",
            data:others,
            token:token
        })
    }
   })
    }catch(err){
        return res.send(err)
    }
})

userRouter.get("/get",async (req,res)=>{
    try{
     const user=await User.find()
     return res.json({
        data:user
     })
    }catch(err){
        return res.send(err)
    }
})


module.exports=userRouter