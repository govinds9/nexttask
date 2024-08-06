import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"


const verifyJwt = async (req,res,next)=>{
  
  try {
    const token = req.cookies?.accesstoken || req.header("Authorization").replace("Bearer ","")
    if(!token){
        return res.status(401).json({
            status:401,
            message:"Unauthorized User please Relogin"
        })
    }
    const decode = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) 
    const user = await User.findById(decode._id).select("-password -refreshtoken")
    if(!user){
        return res.status(401).json({
            status:401,
            message:"Invalid Access token please relogin"
        })
    }
    req.user = user

    next()
  } catch (error) {
    
    return res.status(500).json({
        status:500,
        message:"Something Went Wrong while Authorization"
    })
  }

}
export {verifyJwt}