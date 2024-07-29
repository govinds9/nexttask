
import mongoose,{Schema} from "mongoose";


const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    priority:{
        type:String,
        enum:['low', 'medium','urgent'],
        required:true
    },
    status:{
        type:String,
        enum:["todo","Inprogrss",'under review','finished'],
        default:'todo',
        required:true
    },
    deadline:{
        type:Date,
        required:false

    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
})

export const Task = mongoose.model("Task",taskSchema)