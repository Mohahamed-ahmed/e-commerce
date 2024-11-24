import { getToken } from "../../utils/auth";

export async function checkout({ shippingAddress }){
    const response = await fetch('/api/shop/checkout',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body:JSON.stringify({ shippingAddress })
    })

    if(!response.ok){
        const error = new Error('cant send data')
        error.code = response.status
        error.info = await response.json()
        throw error
    }

    const { url } = await response.json();
    return { url };
}

export async function getOrders() {
    const response = await fetch('/api/shop/orders', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      const error = new Error("An error occurred fetching orders");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { orders } = await response.json();
    return { orders };
  }

  export async function getOrderDetails({signal, id}) {
    const response = await fetch(`/api/shop/orders/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      const error = new Error("An error occurred fetching orders");
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { order } = await response.json();
    return { order };
  }