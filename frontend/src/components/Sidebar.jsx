import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {useLocation, NavLink, useNavigate} from 'react-router-dom'
import { IoIosNotifications } from "react-icons/io";
import { FaClipboard, FaHome } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import store from '../redux/store.js';

import { userLogout } from '../redux/authAction.js';

const Sidebar = () => {
   const {user,islogin} = useSelector(state=>state.auth)


   const history = useNavigate()
  useEffect(() => {
    if (!islogin) {
      history('/login', { replace: true })
    }
  }, [islogin, history])
   
   const handleLogout = ()=>{
     try {
      
      store.dispatch(userLogout({}))
      
    } catch (error) {
      alert(error)
    }
   }
   const pages = [
    {
      name:"Home",
      path:"/home",
      icon:<FaHome />
    },
    {
      name:"Board",
      path:"/board",
      icon:<FaClipboard />
    },
    {
      name:"Setting",
      path:"/setting",
      icon:<IoSettings />
    },
    {
      name:"Team",
      path:"/team",
      icon:<RiTeamFill />

    },
    {
      name:"Analytic",
      path:"/anlytic",
      icon:<SiSimpleanalytics />
    },

   ]

   const location = useLocation()
  return (
    <div className=' flex flex-col gap-10 py-10 px-3'> 
      <div className=' flex flex-row  gap-5 justify-between p-4 items-center roboto-bold  '>

        <div className=' w-10 h-10 rounded-full bg-black  border-gray-500 flex justify-center items-center '>
            <h1 className=' text-white text-xl'>{user?.name[0].toUpperCase()}</h1>

        </div>
        <h1 className=' text-3xl  text-black'> {user?.name[0].toUpperCase()+user?.name.slice(1) || "User"}</h1>

      </div>

      <div className=' flex flex-row  items-center  gap-6 text-gray-500 roboto-bold '>

        <span className=' text-2xl m-2'>

        <IoIosNotifications />
        </span>
        <span className=' text-2xl m-2'>
          <IoSettings/>
        </span>
        <span className=' text-2xl m-2'>
           <MdOutlineKeyboardDoubleArrowRight/>
        </span>


        <button onClick={()=>handleLogout()} className=' py-1 px-2 bg-slate-600 text-gray-300  rounded-lg'> Logout</button>
       
        

      </div>
      <div className=' flex flex-col justify-center  gap-7 text-2xl text-gray-500  tracking-tighter roboto-bold'> 
        {
          pages.map((ele,index)=>(
            <NavLink key={index} className= {`py-2 px-4  rounded-lg hover:bg-black  flex flex-row  gap-4 ${location.pathname ===ele.path?" bg-black":''} `} to={ele.path}><span>{ele.icon}</span><span>{ele.name} </span></NavLink>
          ))
        }

      </div>
      
      
    </div>
  )
}

export default Sidebar
