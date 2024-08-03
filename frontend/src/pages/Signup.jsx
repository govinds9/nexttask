import React, { useState } from 'react'
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import {Link} from 'react-router-dom'
import Button from '../components/Button.jsx';
import store from '../redux/store.js';
import { userRegister } from '../redux/authAction.js';
import { validateEmail } from '../services/helper.js';

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [show, SetShow] = useState(false)

  const handleRegister = ({email,password,name})=>{
    
    if(!validateEmail(email)){
      alert("Enter a valid email")
      return;
    }
    else if(name.length===0){
      alert("Enter Name")
      return
    }
    else if(password.length<6){
      alert("password should be atleast of 6 characters")
      return
    }
   
    try {
      store.dispatch(userRegister({email,password,name}))

      
    } catch (error) {
      console.log(error)
    }
  }


  
  return (
    <div   className=' bg-gradient-to-t from-indigo-400 to-slate-50 h-screen w-screen  py-32 flex justify-center'>
      <div className=' h-4/6  w-1/3  bg-slate-100 border-slate-300 border-2  rounded-xl flex flex-col gap-3  px-8 py-10'>
       <h1 className=' text-center text-3xl m-5 font-bold'> Welcome to <span className=' text-blue-600'>NextTask</span></h1>

       <div className=' flex  flex-col gap-5'>


       <input className=' p-2 rounded-lg bg-slate-200 ' type="text" value={name} placeholder='Full Name'onChange={(e)=>setName(e.target.value)
        
       } />
       <input className=' p-2 rounded-lg bg-slate-200 'type="email" value={email} placeholder='Your Email'onChange={(e)=>setEmail(e.target.value)}  />
       <div className=' flex justify-between items-center rounded-lg bg-slate-200 ' >

       <input className=' p-2 rounded-lg bg-slate-200 w-full '  type={ show?'text':'password'} value={password} placeholder='Your Password'onChange={(e)=>{setPassword(e.target.value)
       
      }
    }  />
    <span onClick={()=>SetShow((prev)=>!prev)} className= ' mx-2 text-xl cursor-pointer' >{show?<AiOutlineEyeInvisible/> :<AiOutlineEye/>} </span>
       
    </div>
    <Button  text={'Sign up'} handleclick={()=>{
      console.log(name)
      handleRegister({email,name,password})}}/>
       </div>

      
       <p className=' text-center text-xl my-5'>Already have an account? <Link className=' text-blue-500' to={'/login'}> Log in</Link>.</p>

</div>
    </div>
  )
}

export default Signup
