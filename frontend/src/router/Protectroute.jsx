import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../redux/authAction';
import store from '../redux/store';

const Protectroute = ({children}) => {
    
    const {islogin,error} = useSelector((state)=>state.auth)
   

    // get user 
    const getuser = async ()=>{
      console.log("into")
        try {
            store.dispatch(getCurrentUser({}))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getuser()
        

    },[])
  

  if(islogin){
    return  children
  }
  else{
    return <Navigate  to={'/login'} />
  }
}

export default Protectroute
