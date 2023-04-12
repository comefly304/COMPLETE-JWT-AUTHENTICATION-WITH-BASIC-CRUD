const express=require('express');
const Connection = require('./config/db.connect');
const userRouter = require('./routes/auth');
require('dotenv').config()
const app=express();
const authentication=require('./authentication')


app.use(express.json())
app.use("/user",userRouter)

app.get("/test",authentication,async(req,res)=>{
return res.send("authenticated")
})


const PORT=7000;
app.listen(PORT,async()=>{
    try{
   await Connection()
   console.log(`server is listening in ${PORT}`)
    }catch(err){
        return res.send(err)
    }
})