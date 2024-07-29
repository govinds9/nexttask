import { User } from "../model/user.model.js";


import { Task } from "../model/task.madel.js";



const registerUser = async (req,res)=>{
    try {
        
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
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Internal Error"
        })
    }
   
    
}

const LoginUser  = async (req,res)=>{

    try {
        
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
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Internal Error"
        })
    }

}



const logOutUser = async(req,res)=>{

    try {
        
        const userId = req.user._id
        await User.findByIdAndUpdate(userId,{
            $unset:{
              refreshtoken:1
            }
          },{
            new:true
          })
      
        const options = {
          httpOnly:true,
          secure:true
        }
    
        return res.status(200).clearCookie("refreshtoken",options).json({
            status:200,
            message:"Logout Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Internal Error"
        })
    }
}



const creatTask = async (req,res)=>{

    try {
        
        const user = req.user;
        const {title,status,description,priority,deadline} =req.body
        if([title,status,priority].some((field)=>field?.trim()==="")){
            return  res.status(401).json({
                status:401,
                message:"title status and priority are required"
            })
        }
        
        const task = await Task.create({
            title,
            status,
            description:description|| undefined,
            deadline:deadline|| undefined,
            priority,
            user:user._id
        
        })
        
        const newtask = await Task.findById(task._id)
        if(!newtask) {
            return res.status(500).json({
                status:500,
                message:"Something went wrong while creating task"
            })
        }
        
        return res.status(200).json({
            status:200,
            message:"task created Successfully",
            data:newtask
        
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Internal Error"
        })
    }


}

const getAlltask = async(req,res)=>{
    try {
        const allTask = await Task.find({
            user:req.user._id
        })
        if(!allTask){
            return res.status(500).json({
                status:500,
                message:"something went wrong while fetching task"
            })
        }
    
    
        res.status(200).json({
            status:200,
            message:'fetched all task',
            data:allTask
        })
        
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:"Internal Error"
        })
    }

   
}


export {registerUser,LoginUser,logOutUser,creatTask, getAlltask}