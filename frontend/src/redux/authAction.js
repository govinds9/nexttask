import { createAsyncThunk} from '@reduxjs/toolkit'
import Api from '../services/Api.js'

//import {toast} from 'react-toastify'


// Registration

const userRegister = createAsyncThunk('/register',async({name, email, password},{rejectWithValue})=>{
    try {
        
        const data = await Api.post('/register', {name, email,password})
        console.log(data)
        if(data.status<300){
            
            alert(data.data.message)
            window.location.replace("/login")
            return data.data
        }
        else{
            alert(data.data.message)
            return data.data
        }
    } catch (error) {
        if(error.response && error.response.data.message){
            alert(error.response.data.message)
            return rejectWithValue(error.response.data.message)

        }
            else {
            
                return rejectWithValue(error.message)
            }
    }
})

 // login

 const userLogin = createAsyncThunk('/login',async({email,password},{rejectWithValue})=>{
try {
    const data = await Api.post('/login',{email,password})

    if(data.status<300){
        localStorage.setItem("accesstoken",data?.data?.accesstoken)
        alert(data?.data?.message)
       
        
        return data?.data
    }
    else{
        alert(data.message)
        return data?.data
    }
} catch (error) {
    
    if(error.response && error.response.data.message){
        alert(error.response.data.message)
        return rejectWithValue(error.response.data.message)}
        else {
            alert(error.message)
            
            return rejectWithValue(error.message)
        }
    
}
 })

 const getCurrentUser = createAsyncThunk(
    "/getuser",
    async ({},{rejectWithValue})=>{
        try {
         
            const res =await Api.get('/getuser')
            if(res.status<300 && res.data){
                return res.data 
            }
            
        } catch (error) {
            
        
            if(error.response && error.response.data.message){
                alert(error.response.data.message)
                return rejectWithValue(error.response.data.message)}
        else {
            alert(error.message)
            return  rejectWithValue(error.message)
        }
    }
}
)

const userLogout = createAsyncThunk('/logout',async ({},{rejectWithValue})=>{
   
    
    try {
        const res = await Api.post('/logout')
        if(res.status<300){
            
            localStorage.removeItem("accesstoken")
            return res.data
        }
    } catch (error) {
        
        if(error.response && error.response.data.message){
            alert(error.response.data.message)
        return rejectWithValue(error.response.data.message)

        }
        else {
            alert(error.message)
            return  rejectWithValue(error.message)
        }
    }
})

 export {userLogin,userRegister, getCurrentUser, userLogout}