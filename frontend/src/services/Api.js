import axios from 'axios'
import { BASE_URL } from './helper.js'


const Api = axios.create({baseURL:BASE_URL})
Api.interceptors.request.use((req)=>{
    if(localStorage.getItem("accesstoken")){
        req.headers.Authorization = `Bearer ${localStorage.getItem("accesstoken")}`;
    }
    return req
})

export default Api