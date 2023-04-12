const mongoose=require('mongoose')


function Connection(){
    try{
    mongoose.connect('mongodb+srv://jwt:1234@cluster0.4gedljj.mongodb.net/?retryWrites=true&w=majority')
    console.log("mongodb connected...")
    }catch(err){
        return res.send(err)
    }
}

module.exports=Connection