import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
name:{
    type:String,
    required:true,
    lowercase:true,
    
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},
password: {
    type: String,
    required: [true, "Password are required"],
  }

},
{
    timestamps:true
}); 

export const User = mongoose.model("User",userSchema)