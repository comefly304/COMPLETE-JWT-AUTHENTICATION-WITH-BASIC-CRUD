const jwt=require('jsonwebtoken')


 async function authentication (req,res,next){
    const token=req.query.token || req.body.token ||req.headers["authorization"]

    if(!token){
  return res.send("token is not present")
    }
    try{
     const decode= jwt.verify(token,process.env.JWT_SECRET)
    return res.json({
        msg:"authenticated...",
        data:decode
    })
    }catch(err){
        return res.send(err)
    }
    return next()
}
    
module.exports=authentication