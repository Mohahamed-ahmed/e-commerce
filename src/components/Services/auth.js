import SignUp from "../Auth/SignUp";
import apiService from "./apis";
import { getToken } from "../../utils/auth";



const authServices ={
     login:async(loginData)=>{
        return await apiService.post('/auth/login',loginData)
     },

     SignUp:async(signupData)=>{
        return await apiService.post('/auth/signup',signupData)
     },
}

export async function logout(){
   const response = await fetch('/api/auth/logout',{
     method:'GET',
     headers: {
       "Content-Type": "application/json",
       Authorization: "Bearer " + getToken(),
     },
   })
   
   if(!response.ok){
     const error = new Error('cannot logout')
     error.code  = response.status;
     error.info = await response.json()
     console.error('Server error:', error, error.info);
     throw error;
   }

   localStorage.removeItem('token')
 
   const data = await response.json()
   return data
 
 
 }

export async function getProfile(){

  const token  = getToken()

  const response = await fetch('/api/auth/profile',{
    method:'GET',
    headers:{
      "Content-type" : "application/json",
      Authorization: "Bearer " + getToken(),
    },
  })

  if(!response.ok){
    const error = new Error ('cant get user data')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const data = await response.json()
  return data

}


export async function getRefreshToken() {
  const response = await fetch(`/api/auth/refresh-token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = new Error("Could get refresh token");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const {token} = await response.json();
    localStorage.setItem("token", token);
  
  return token;
}


export default authServices