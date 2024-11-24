import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const client = new QueryClient()

// const apiUrl = process.env.VITE_API_URL;
// console.log(apiUrl); // Check if this prints the correct local API URL\
// console.log('mmmmm')

const apiClient = axios.create({
    baseURL:'/api',
    headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': 'true'
    },
    timeout:10000,
    withCredentials:true
})

const apiService = {
    //get request
    get:async(url,params={},headers)=>{
        try{
            const response = await apiClient.get(url,{params,headers})
            return {data: response.data , error:null}
        }catch(error){
            return {data:null, error}
        }
    },

    post:async(url,data,headers={})=>{
        try{
            const response = await apiClient.post(url,data,{headers})
            return {data: response.data, error:null}
        }catch(error){
            return{data:null, error:error.response}
        }
    }
}

export default apiService