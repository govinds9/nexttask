
import mongoose,{Schema} from "mongoose";


const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    priority:{
        type:String,
        enum:['low', 'medium','urgent'],
        default:'urgent'
    },
    status:{
        type:String,
        enum:["todo","Inprogrss",'under review','finished'],
        default:'todo',
        required:true
    },
    deadline:{
        type:Date,

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