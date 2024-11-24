import apiService from "./apis";

const CartServices = {
    getCartItems : async()=>{
        return await apiService.get('/shop/cart')
    }

}

export default CartServices