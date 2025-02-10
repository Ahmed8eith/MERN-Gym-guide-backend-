import mongoose from "mongoose";


const routineSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true
    },
    workouts:[{
        workoutId:String
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
   
},{
    timestamps:true
})

export default mongoose.model('Routine', routineSchema)