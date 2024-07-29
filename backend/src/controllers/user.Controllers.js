import { User } from "../model/user.model.js";

import jwt from "jsonwebtoken"
import fs from 'fs'



const registerUser = async (req,res)=>{
   
    const {name, email,password} = req.body

    if([name,email,password].some((field)=>field?.trim()==="")){
       return  res.status(400).json({
            status:400,
            message:"All fields are required"
        })
    }

    const exitUser = await User.findOne({email})
    const temp = await User.find()
    console.log(temp)
    if(exitUser){
      return  res.status(400).json({
            status:400,
            message:"User already exist with this email"
        })
    }
    const newUser = await User.create({
        name:name.toLowerCase(),
        email,
        password
    })
    const createdUser =await User.findById(newUser._id).select(
        "-password "
    )
    if(!createdUser){
        return res.status(500).json({
            status:500,
            message:"Something went wrong while creating User"
        })
    }

    return res.status(200).json({
        status:200,
        message:"User Created Successfully",
        user:createdUser
    })
    
}

const LoginUser  = async (req,res)=>{
    const {email,password} = req.body
    if(!(email || password)){
        return res.status(400).json({
            status:400,
            message:"All fields are required"
        }
    )
     }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            status:400,
            message:"User Not found"
        })
    }

    const isvalid = await user.ispasswordCorrect(password);
    if(!isvalid){
      return  res.status(401).json({
            status:401,
            message:"Incorrect Password"
        })
    }

    const refreshtoken = await user.generateRefreshToken ()
    if(!refreshtoken){
        return res.status(500).json({
            status:500,
            message:"Something went wrong while login"
        })
    }
    user.refreshtoken = refreshtoken
  await user.save({validateBeforeSave:false})
  const loginedUser= await User.findById(user._id).select("-password -refreshtoken")

 const options = {
  httpOnly:true,
  secure:true
 }

 return res.status(200).cookie("refreshtoken",refreshtoken,options).json({
    status:200,
    message:"User Login Successfully",
    user:loginedUser
 })

}

const Auth = async(req,res)=>{
    return res.json({user:req.user})
}


export {registerUser,LoginUser,Auth}