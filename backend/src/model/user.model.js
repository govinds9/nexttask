import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

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
  },
  refreshtoken:{
    type:String
  }

},
{
    timestamps:true
}); 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
  
    next();userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) return next();
      const salt = bcrypt.genSaltSync(10);
      this.password = await bcrypt.hashSync(this.password, salt);
    
      next();
    });
  });
userSchema.methods.ispasswordCorrect = async function (password) {
    return await bcrypt.compareSync(password, this.password);
  };

  userSchema.methods.generateRefreshToken = async function () {
    // console.log("Refresh token")
    return await jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };
export const User = mongoose.model("User",userSchema)