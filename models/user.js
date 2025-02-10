import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }
},{
    timestamps:true
})

export default mongoose.model('user',userSchema)