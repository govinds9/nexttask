import React from 'react'
import {useSelector} from 'react-redux'
const Home = () => {
    const {islogin,user} = useSelector(state=>state.auth)
    if(islogin)return<div>
        <h1>Login</h1>
        <p>{user?.name}</p>
    </div>
  return (
    <div>
        Not Login
      
    </div>
  )
}

export default Home
