import { createSlice } from "@reduxjs/toolkit";
import { userLogin,userRegister } from "./authAction.js";


const initialState = {
    loading:false,
    user:null,
    islogin:false,
    error:null
}



const authSlice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.loading=true;
            
            state.error=null;
        });
        builder.addCase(userLogin.fulfilled,(state,{payload})=>{
            
            state.loading=false;
            state.islogin =true;
            state.user = payload?.user;
           
            


        });

        builder.addCase(userLogin.rejected,(state,{payload})=>{
            state.loading=false;
            state.error = payload;
        });

        //register 
        builder.addCase(userRegister.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(userRegister.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user = payload.data.user;
          

        });

        builder.addCase(userRegister.rejected,(state,{payload})=>{
            
            state.loading=false;
            state.error = payload;
        });
       

       
    },
})

export default authSlice