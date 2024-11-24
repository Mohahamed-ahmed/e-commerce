import { json } from "react-router-dom";
import { getToken } from "../../utils/auth";


export async function getCart(){
  const response = await fetch('/api/shop/cart',{
    method:'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
      'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': 'true'
    },
    withCredentials:true
  })
  
  if(!response.ok){
    const error = new Error('cannot get cart')
    error.code  = response.status;
    error.info = await response.json()
    console.error('Server error:', error, error.info);
    throw error;
  }

  const data = await response.json()
  return data


}

export async function addToart(product) {
    const response = await fetch('/api/shop/cart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(product),
    //   credentials: "include",
    });
  
    if (!response.ok) {
      const error = new Error("An error occurred while fetching the events");
      error.code = response.status;
      error.info = await response.json();
      console.error('Server error:', error, error.info);
      throw error;
    }
  
    // const { items, totalQuantity } = await response.json();
    const responseData = await response.json(); // Get the successful response
    console.log('Response data:', responseData);
    return responseData;
    // return { items, totalQuantity };
  }

  export async function decreaseFromCart(productId){
    const response = await fetch ('/api/shop/cart',{
      method:"PATCH",
      headers:{
        "Content-type":"application/json",
        Authorization: "Bearer " + getToken()
      },
      body:JSON.stringify(productId)
    })

    if(!response.ok){
      const error = new Error('cant delete one item')
      error.code = response.status
      error.info = await response.json()
      throw error
    }

    const data = await response.json()
    return data
  }

  export async function removeItemFromCart(productId){
    const response = await fetch('/api/shop/cart',{
      method:'DELETE',
      headers:{
        "Content-type":"application/json",
        Authorization:"Bearer " + getToken()
      },
      body:JSON.stringify(productId)
    })
    
    if(!response.ok){
      const error = new Error ('cant remove item')
      error.code = response.status
      error.info = await response.json()
      throw error
    }

    const data = response.json()
    return data
  }

